import { default as BiwaScheme } from "npm:biwascheme@0.8.0";

console.log("BiwaScheme version " + BiwaScheme.VERSION);
console.log("try (+ 1 2), etc. (Ctrl-C to exit)");

var erred = new Object();

var biwaInput = "";
while (true) {
  try {
    if (biwaInput.length > 0) {
      var result = BiwaScheme.run(biwaInput, { no_print: true });
    } else {
      biwaInput = " " + prompt("biwascheme> ", "");
      var result = BiwaScheme.run(biwaInput, { no_print: true });
    }
  } catch (e) {
    if (e instanceof BiwaScheme.Parser.Unterminated) {
      biwaInput += " " + prompt("...       ", "");
    }
    continue;
  }

  if (result !== erred && !(result instanceof BiwaScheme.Pause)) {
    if (result == "#<undef>") {
      Deno.exit();
    }
    console.log(BiwaScheme.to_write(result));
  }
  biwaInput = "";
}
