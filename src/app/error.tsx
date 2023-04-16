"use client"; // Error components must be Client components

import { FC } from "react";

interface errorProps {}

const error: FC<errorProps> = ({}) => {
  return <div>error</div>;
};

export default error;
