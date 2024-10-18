import { TextField } from "@kobalte/core/text-field";
import type { VoidComponent } from "solid-js";
import { TextFieldInput } from "../../components/ui/text-field";

const Home: VoidComponent = () => {
  return (
    <div class="flex flex-col gap-6 p-6">
      <div class="flex w-full items-center justify-center">
        <h1 class="inline-block bg-gradient-to-br from-gray-200 to-gray-500 bg-clip-text text-6xl font-bold text-transparent">
          New Tier
        </h1>
      </div>
      <div>
        aa
        <TextField>
          <TextFieldInput type="text" placeholder="hi" />
        </TextField>
      </div>
    </div>
  );
};

export default Home;
