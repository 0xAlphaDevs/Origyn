import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src="/logo.png" width={150} height={150} alt="Logo" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-primary">Welcome to ORIGYN !</h1>
        <p className="text-muted-foreground">
          A platform to sell digital goods using your World ID and creator provenance and rights using on-chain attestations.
        </p>
      </div>
    </main>
  );
}
