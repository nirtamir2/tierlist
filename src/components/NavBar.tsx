import Logo from "../assets/logo.svg?component-solid";

export function NavBar() {
  return (
    <header class="flex h-14 w-full max-w-screen-sm justify-between gap-4 rounded-full bg-gray-900 px-4 shadow-inner shadow-white sm:px-8 md:px-16">
      <a href="/" class="flex items-center gap-4">
        <Logo height={36} width={36} />
        <h1 class="inline-block bg-gradient-to-br from-gray-200 to-gray-500 bg-clip-text text-3xl font-bold text-transparent">
          Tierlist
        </h1>
      </a>
      <div class="flex items-center">
        <a href="/tier" class="font-bold text-gray-300">
          Tier
        </a>
      </div>
    </header>
  );
}
