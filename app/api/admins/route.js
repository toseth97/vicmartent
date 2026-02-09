import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        await dbConnect();

        const admins = await Admin.find()
            .select("-password")
            .sort({ createdAt: -1 });

        return NextResponse.json(admins);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch admins" },
            { status: 500 },
        );
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        await dbConnect();

        // Check if current user is default admin
        const currentAdmin = await Admin.findOne({ email: session.user.email });
        if (!currentAdmin || !currentAdmin.isDefault) {
            return NextResponse.json(
                { error: "Only default admin can create new admins" },
                { status: 403 },
            );
        }

        const { email, password } = await request.json();

        // Validate email domain for non-default admins
        if (!email.endsWith("@aavabrands.com")) {
            return NextResponse.json(
                { error: "Admin email must end with @aavabrands.com" },
                { status: 400 },
            );
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return NextResponse.json(
                { error: "Admin already exists" },
                { status: 400 },
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            isDefault: false,
        });

        // Return admin without password
        const { password: _, ...adminWithoutPassword } = newAdmin.toObject();

        return NextResponse.json(adminWithoutPassword, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create admin" },
            { status: 500 },
        );
    }
}
