import Image from "next/image";
import * as React from "react";

const newLocal = "/icon/icon.png";
const Logo = ({ className }: { className?: string }) => (
  <Image src={newLocal} alt={""} height={100} width={100} className={className} />
);

export default Logo;