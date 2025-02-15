import { db } from "@/lib/db";
import { signUpSchema } from "@/lib/schema";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = await body.formData;

    const { name, email, password } = userData;

    console.log(email);
    const validatedData = signUpSchema.parse({name, email, password});
    const duplicatedUser = await db.user.findUnique({
      where: { email },
    });
    if (duplicatedUser) {
      return NextResponse.json(
          { message: "Email already exists" },
          { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    await db.user.create({
      data: {
        name: validatedData.name.toLowerCase(),
        email: validatedData.email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
    );

  } catch (error) {
    if (error instanceof Error){
      console.log("Error: ", error.stack)
    }
  }
}
