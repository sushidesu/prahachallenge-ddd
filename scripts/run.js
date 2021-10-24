const { spawnSync } = require("child_process")

/**
 * コマンドライン引数を任意の場所に埋め込んで実行するscript
 */
function main() {
  let command = process.argv[2]
  const args = process.argv.slice(3)
  for (const arg of args) {
    command = command.replace("{}", arg)
  }
  console.log({ command })
  spawnSync(command, { shell: true, stdio: "inherit"})
}

main()
