import { useRouter } from "next/router";
import { useRouter } from "next/router";
import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { PRP_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, "hello");
        user = await prisma.user.findUnique({
          where: { id },
        });

        //user is NOT authorized
        if (!user) {
          throw new Error("Not real user");
        }
      } catch (e) {
        res.status(401);
        res.json({ error: "Not Authorized!" });
        return;
      }
      //user is authorized
      return handler(req, res, user);
    }
    //no token provided
    res.status(401);
    res.json({ error: "Not Authorized!" });
  };
};
