import { NextResponse } from "next/server";

export async function GET() {
    const branches = [
        {
            id: 1,
            city: "LAGOS",
            address: "13 Fatai Atere Way, Matori",
            email: "contact@aavabrands.com",
        },
        {
            id: 2,
            city: "IBADAN",
            address: "Oluyole Ext, Off Ring Rd",
            email: "contact@aavabrands.com",
        },
        {
            id: 3,
            city: "ONITSHA",
            address: "Factory Road, East Niger",
            email: "contact@aavabrands.com",
        },
        {
            id: 4,
            city: "ENUGU",
            address: "Ikulu East Layout",
            email: "contact@aavabrands.com",
        },
        {
            id: 5,
            city: "BENIN",
            address: "100 Textile Mill Rd",
            email: "contact@aavabrands.com",
        },
        {
            id: 6,
            city: "PORT HARCOURT",
            address: "Trans Amadi",
            email: "contact@aavabrands.com",
        },
        {
            id: 7,
            city: "KANO",
            address: "Murtala Muhammad Way",
            email: "contact@aavabrands.com",
        },
        {
            id: 8,
            city: "ABUJA",
            address: "Independence Avenue",
            email: "contact@aavabrands.com",
        },
    ];

    return NextResponse.json(branches);
}
