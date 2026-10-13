# 01. Go: основы и каркас сервера

**Цель:** ты уверенно читаешь и пишешь Go, а в `server/` есть каркас сервера с первым Connect RPC-сервисом,
конфигурацией, логами, тестами и запуском в Docker.

Связь с решениями: раздел 4 (API — Connect RPC), раздел 6.2 (модули Go-сервера).

## Что изучить

1. **Tour of Go** целиком: <https://go.dev/tour/>. Особенно: срезы и map, методы и интерфейсы, ошибки,
   горутины и каналы, `select`.
2. Официальные туториалы: <https://go.dev/doc/tutorial/> — «Create a module», «Getting started with multi-module
   workspaces», «Developing a RESTful API», «Getting started with generics».
3. **Effective Go**: <https://go.dev/doc/effective_go> — как пишут идиоматичный Go.
4. Пакеты стандартной библиотеки, которые понадобятся сразу:
   - `net/http` — сервер и маршрутизация (с Go 1.22 есть шаблоны вида `GET /sets/{id}`);
   - `encoding/json`, `context`, `log/slog`, `testing`, `net/http/httptest`, `errors`.
5. Структура проекта: <https://go.dev/doc/modules/layout>.
6. Protocol Buffers (proto3): <https://protobuf.dev/programming-guides/proto3/> — сообщения, поля и их номера,
   `enum`, `oneof`, `repeated`, правила обратной совместимости (почему нельзя менять номер поля).
7. Connect RPC: <https://connectrpc.com/docs/introduction> — затем «Getting started» для Go и для Web.
   Разберись, чем протокол Connect отличается от gRPC и gRPC-Web и почему браузеру не нужен прокси.
8. `buf`: <https://buf.build/docs/> — `buf.yaml`, `buf.gen.yaml`, `buf lint`, `buf breaking`, `buf generate`.

Совет: в начале не бери фреймворки (Gin, Echo и т. п.). Стандартной библиотеки достаточно, и так ты лучше поймёшь,
как всё устроено.

## Шаги

1. Пройди Tour of Go. Решай упражнения сам, без агента. Свои выводы запиши в `roadmap/notes/go.md`.
2. `server/`: `go mod init github.com/<ты>/flippo/server`. Структура:
   ```text
   proto/flippo/<сервис>/v1/*.proto   ← контракты (в корне репозитория, общие для Go и TS)
   server/
     cmd/flippo/main.go     ← точка входа
     gen/                   ← код, сгенерированный buf (не правится руками)
     internal/config/       ← чтение конфигурации из переменных окружения
     internal/httpapi/      ← роутер, middleware, обработчики
     internal/<модуль>/     ← позже: auth, sets, vaults…
   ```
3. Конфигурация: структура `Config` (порт, адрес SurrealDB, уровень логов), заполняется из переменных окружения;
   ошибка с понятным текстом, если чего-то не хватает.
4. Логи через `log/slog` в формате JSON.
5. Эндпоинт `GET /healthz` → `{"status":"ok"}`.
6. Middleware: логирование запроса (метод, путь, статус, длительность), восстановление после panic, request ID.
   Напиши его сам как функцию `func(http.Handler) http.Handler`.
7. Корректная остановка: по `SIGINT/SIGTERM` сервер перестаёт принимать запросы и дожидается текущих
   (`http.Server.Shutdown` + `context`).
8. Тесты: `httptest` для `/healthz` и middleware. Табличные тесты (table-driven tests) для конфигурации.
9. `Dockerfile` (многоэтапная сборка) и `docker-compose.yml` в корне репозитория с сервисом `server`.
10. Первый Connect-сервис. Контракт `proto/flippo/ping/v1/ping.proto`: метод `Ping(PingRequest{message}) →
    PingResponse{message, server_time}` и метод `Count(CountRequest{to}) → stream CountResponse{n}` (стриминг от
    сервера: числа от 1 до `to` раз в секунду).
    - `buf.yaml` и `buf.gen.yaml` в корне; генерация Go-кода (`protoc-gen-go` + `protoc-gen-connect-go`) и
      TS-кода (`protoc-gen-es`, пакет `packages/api`).
    - Реализация на Go, подключение хендлера в тот же `http.ServeMux`, что и `/healthz`, со всеми твоими
      middleware.
    - Проверка через `curl` в JSON-режиме и через `buf curl`.
    - Тесты через сгенерированный Go-клиент против `httptest.NewServer`.
    - Минимальная страница на Vite + `@connectrpc/connect-web`, которая вызывает `Ping` и показывает поток
      `Count`. Так ты проверишь, что из браузера всё работает без прокси.
    - Добавь `buf lint` и `buf breaking` (против основной ветки) в проверки перед коммитом.
11. Упражнение на конкурентность: эндпоинт `GET /debug/slow?n=5` запускает n горутин, каждая «работает» случайное
    время, ответ — когда все закончили или через 2 секунды по таймауту (`context.WithTimeout`, `sync.WaitGroup`
    или `errgroup`). Потом удали или спрячь за флагом.

## Готово, когда

- [ ] `go test ./...` зелёный, `go vet ./...` без замечаний.
- [ ] `docker compose up server` поднимает сервер, `curl localhost:<порт>/healthz` отвечает.
- [ ] Ctrl+C останавливает сервер корректно, это видно в логах.
- [ ] `Ping` и стриминг `Count` работают из Go-теста, из `curl` и со страницы в браузере.
- [ ] `buf lint` чистый; ты попробовал изменить номер поля и увидел, как `buf breaking` это ловит.
- [ ] Ты можешь объяснить своими словами: интерфейсы в Go, `context`, `error` против panic, горутины и каналы,
      а также чем Connect отличается от gRPC и почему номера полей в protobuf нельзя менять.

## Ловушки

- Не правь сгенерированный код руками: меняй `.proto` и запускай `buf generate`.
- Ошибки в RPC — через коды Connect (`connect.NewError(connect.CodeNotFound, err)`), а не через текст в ответе.

- Не игнорируй ошибки (`_ = f()`). В Go ошибка — обычное значение, её возвращают и оборачивают:
  `fmt.Errorf("load config: %w", err)`.
- Глобальные переменные для зависимостей (база, логгер) — плохая привычка. Передавай их в структуры обработчиков.
