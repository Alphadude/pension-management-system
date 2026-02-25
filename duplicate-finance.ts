import fs from "fs";
import path from "path";

const SRC_DIR = path.join(process.cwd(), "src/app/(finance)");
const DEST_DIR = path.join(process.cwd(), "src/app/(accountant)");

// Ensure destination exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

function processDirectory(src: string, dest: string) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);

    // Rename occurrences of 'finance' to 'accountant' in file/folder names
    let destName = entry.name.replace(/finance/gi, (match) =>
      match === "finance" ? "accountant" : "Accountant",
    );
    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      processDirectory(srcPath, destPath);
    } else {
      let content = fs.readFileSync(srcPath, "utf-8");

      // We need to replace specific strings but avoid breaking imports from hooks
      // Finance -> Accountant
      // finance -> accountant (but NOT in use-finance)

      content = content.replace(/Finance/g, "Accountant");
      // replace finance with accountant, but NOT in generic things like 'use-finance'
      // safe way: replace finance-dashboard -> accountant-dashboard
      content = content.replace(/finance-dashboard/g, "accountant-dashboard");
      content = content.replace(/financeDash`/g, "accountantDash`");
      content = content.replace(/financeDashboard/g, "accountantDashboard");
      content = content.replace(/finance-/g, "accountant-");

      // We still want to use the existing hooks, so change back `use-finance` and `useGetAccountantDashboard` etc if they got affected
      // Above logic mainly left `finance` untouched if it didn't match those patterns.
      // E.g., `useGetFinanceDashboardOverview` won't be replaced because it's uppercase F. Oh wait, `Finance` gets replaced with `Accountant` completely.
      // So `useGetFinanceDashboardOverview` becomes `useGetAccountantDashboardOverview`.
      // We NEED to restore the correct hooks to not break the page.

      content = content.replace(
        /useGetAccountantDashboardOverview/g,
        "useGetFinanceDashboardOverview",
      );
      content = content.replace(
        /useGetAccountantProfile/g,
        "useGetFinanceProfile",
      );

      fs.writeFileSync(destPath, content);
    }
  }
}

processDirectory(SRC_DIR, DEST_DIR);
console.log("Duplication complete!");
