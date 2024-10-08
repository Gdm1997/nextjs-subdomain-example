import Image from "next/image";
import Link from "next/link";
import React from "react";

const FormView = ({ params }: { params: { subdomain: string } }) => {
  return (
    <div>
      Domain : {params.subdomain}
      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/"
      >
        <Image
          aria-hidden
          src="https://nextjs.org/icons/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Go to home page →
      </Link>
    </div>
  );
};

export default FormView;
