import Logo from "../assets/logo.svg?component-solid";

export function NavBar() {
  return (
    <header class="flex w-full justify-center gap-4 pt-4">
      <div class="flex h-16 w-full max-w-screen-sm justify-between gap-4 rounded-full px-4 shadow-inner shadow-white sm:px-8 md:px-16">
        <div class="flex items-center gap-4">
          <Logo height={48} width={48} />
          <h1 class="inline-block bg-gradient-to-br from-gray-200 to-gray-500 bg-clip-text text-4xl font-bold text-transparent">
            Tierlist
          </h1>
        </div>
        <div class="flex items-center">
          <a href="/tier" class="text-xl font-bold text-gray-300">
            Tier
          </a>
        </div>
      </div>
    </header>
  );
}
