import { validateRoute } from "./../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(async (req, res, user) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  res.json(playlists);
});
