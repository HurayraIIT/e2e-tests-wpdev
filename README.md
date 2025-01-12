# e2e-tests-wpdev
End-To-End test automation of WPDeveloper free plugins using playwright.

## Installation

_Follow the steps below to setup and run the project locally on your machine._

1. Clone the repo
   ```sh
   git clone git@github.com:HurayraIIT/e2e-tests-wpdev.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create the `.env` file and provide necessary details
   ```sh
   cp .env.example .env
   ```
4. Update/Install playwright browsers.
   ```sh
   npx playwright install --with-deps
   ```
5. Create storage state files.
  ```sh
  mkdir -p playwright/.auth && cd playwright/.auth
  for role in admin editor author contributor subscriber unauth; do echo "{}" > "$role.json"; done
  ```

## Usage

To run the tests:

```sh
npx playwright test
```

_For more examples, please refer to the [ Official Documentation](https://playwright.dev)_

## Top contributors:

<a href="https://github.com/HurayraIIT/e2e-tests-wpdev/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=HurayraIIT/e2e-tests-wpdev" alt="contrib.rocks image" />
</a>