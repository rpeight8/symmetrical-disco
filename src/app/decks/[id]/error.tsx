"use client";

import "client-only";
import { FC } from "react";

interface errorProps {
  error: Error;
  reset: () => void;
}

const Error: FC<errorProps> = ({ error, reset }) => {
  console.log(error);
  return <div>{error.message}</div>;
};

export default Error;
