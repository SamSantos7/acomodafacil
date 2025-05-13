import { getSession } from "next-auth/react";

export async function requireAuthentication(context, callback) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  
  return callback({ session });
}

export async function requireAdminAuthentication(context, callback) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  
  if (session.user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  
  return callback({ session });
}