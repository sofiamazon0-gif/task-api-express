const course = {
  name: "Programación Backend con TypeScript",
  environment: "Visual Studio Code",
  packageManager: "PNPM",
  status: "Configurado",
};

function createSummary(data: typeof course): string {
  return `${data.name}: entorno ${data.status.toLowerCase()}`;
}

const summary = createSummary(course);

console.log(summary);
console.table(course);
