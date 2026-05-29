import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "../../../../lib/mongodb";
import Admin from "../../../../models/Admin";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials");
                    return null;
                }

                await dbConnect();

                const admin = await Admin.findOne({ email: credentials.email });
                console.log("Admin found:", admin ? "yes" : "no");

                if (!admin) {
                    console.log(
                        "Admin not found for email:",
                        credentials.email,
                    );
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    admin.password,
                );
                console.log("Password valid:", isPasswordValid);

                if (!isPasswordValid) {
                    console.log(
                        "Invalid password for email:",
                        credentials.email,
                    );
                    return null;
                }

                return {
                    id: admin._id.toString(),
                    email: admin.email,
                    name: admin.name,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // Update session every 24 hours
    },
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        },
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
