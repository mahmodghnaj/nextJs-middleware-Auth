import { NextRequest } from "next/server";

const checkAuth = async (request: NextRequest) => {
  const tokenCookie = request.cookies.get("token");
  console.log(tokenCookie, "sssss");
  if (tokenCookie) {
    try {
      const loginRequest = await fetch(`${process.env.BASE_URL}/api/auth`, {
        headers: {
          Cookie: `token=${tokenCookie.value}`,
        },
      });
      if (loginRequest.ok) return "ok";
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};
export default checkAuth;
