import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { body } = req;
    const { email, password } = body;
    if (email === "test@test.com" && password === "123123") {
      const token = jwt.sign(
        {
          data: email,
        },
        process.env.SECRET || "secret",
        { expiresIn: "10h" }
      );
      res.setHeader(
        "Set-Cookie",
        `token=${token}; path=/; HttpOnly=true; expires=${new Date(
          Date.now() + 10 * 60 * 60 * 1000 // 10 hours in milliseconds
        ).toUTCString()}`
      );
      res.status(200).json({ message: "login" });
    } else {
      res.status(401).json({ message: "email or password incorrect" });
    }
  } else if (req.method === "GET") {
    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRET || "secret");
        res.status(200).json({ message: "Token is valid" });
      } catch (error) {
        res.status(401).json({ message: "Token verification failed" });
      }
    } else {
      res.status(401).json({ message: "Token is missing" });
    }
  } else if (req.method === "DELETE") {
    res.setHeader(
      "Set-Cookie",
      `token=; path=/; HttpOnly=true; expires=${new Date(0).toUTCString()}`
    );
    res.status(200).json({ message: "Token deleted" });
  } else {
    res.status(400).json({ message: "Not Found" });
  }
}
