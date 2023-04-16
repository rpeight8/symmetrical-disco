import { options } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, options);
  if (session) {
    // Signed in
    console.log("V1 Session", JSON.stringify(session, null, 2));
  } else {
    // Not Signed in
    console.log("Not signed in");
    res.status(401);
  }
  res.end();
};

export default handler;
