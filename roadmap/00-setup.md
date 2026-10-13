# 00. Подготовка

**Цель:** установлены все инструменты, репозиторий разложен под новый проект, старый код убран в `legacy/`.

## Что изучить

- Как устроен pnpm workspace: <https://pnpm.io/workspaces>
- Go modules: <https://go.dev/doc/modules/managing-dependencies>
- Cargo (пакетный менеджер Rust): <https://doc.rust-lang.org/cargo/getting-started/>
- Требования Tauri 2 к системе: <https://v2.tauri.app/start/prerequisites/>

## Важно про окружение

Ты работаешь в WSL2. Учти:

- **Десктоп-окно Tauri** из WSL открывается через WSLg, для разработки этого достаточно. Сборку `.exe` для Windows
  делай на стороне Windows (или в CI).
- **Android** можно собирать из WSL, но эмулятор удобнее запускать в Windows. Либо подключай реальный телефон.
- **iOS собирается только на macOS с Xcode.** Без Mac нужен облачный Mac или CI с macOS-раннерами (например,
  GitHub Actions). Реши это до этапа 03, иначе P1 на iOS не проверить.

## Шаги

1. Установи Go (последняя стабильная версия): <https://go.dev/doc/install>. Проверь: `go version`.
2. Установи Rust через rustup: <https://rustup.rs>. Проверь: `rustc --version`, `cargo --version`.
3. Установи системные зависимости Tauri для Linux (WebKitGTK и др.) по странице prerequisites.
4. Установи Docker (Docker Desktop с интеграцией WSL или Docker Engine в WSL). Он нужен для SurrealDB, MinIO и
   сервера.
5. Установи SurrealDB CLI: <https://surrealdb.com/docs/surrealdb/installation>. Проверь: `surreal version`.
6. Для Android: Android Studio, SDK, NDK — по странице prerequisites Tauri (раздел Android).
7. Разложи репозиторий:
   ```text
   flippo/
     legacy/        ← сюда git mv frontend/ backend/ и старые конфиги (turbo.json, старый package.json)
     apps/          ← клиент (появится на этапе 07)
     packages/      ← domain, editor, sync… (этап 06+)
     proto/         ← контракты Connect RPC (этап 01)
     server/        ← Go (этап 01)
     collab/        ← Hocuspocus (этап 09)
     prototypes/    ← черновые прототипы P1–P5
     roadmap/
     design/
   ```
   Используй `git mv`, чтобы история файлов сохранилась.
8. Создай новый корневой `package.json` и `pnpm-workspace.yaml` с пакетами `apps/*`, `packages/*`, `collab`,
   `prototypes/*`. Подключи Biome как в `flippo-ui` (`@flippo-software/biome`). Пакет
   `packages/api` будет содержать TS-код, сгенерированный из `proto/`.
9. Добавь `.editorconfig` и `.gitignore` для Go (`/server/bin`), Rust (`target/`) и Node.

## Готово, когда

- [ ] `go version`, `cargo --version`, `surreal version`, `docker run hello-world` работают.
- [ ] Старый код в `legacy/`, корень чистый, `pnpm install` в корне проходит.
- [ ] Решено, где собирать iOS (свой Mac, облачный Mac, CI).
- [ ] Коммит «chore: move old app to legacy, prepare workspace».

## Ловушки

- Не держи проект на диске Windows (`/mnt/c/...`) — в WSL это очень медленно. Держи в `~/projects`.
- `node_modules` в корне сейчас от старого проекта: после переноса удали его и поставь заново.
