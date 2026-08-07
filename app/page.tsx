import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div>
      <h1>Welcome to the Home Page</h1>
      <Link href="/pages/sign-in">
        <button>Sign Up</button>
      </Link>    
   </div>
  );
}
