import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background p-4 text-center dark:text-white">
      <p>
        © All rights reserved {new Date().getFullYear()} |{" "}
        <Link
          href={"https://www.linkedin.com/in/tusharupadhya/"}
          target="_blank"
          className="transition-all duration-200 hover:text-orange-700 dark:hover:text-orange-300"
        >
          Tushar Upadhyay
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
