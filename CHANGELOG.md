# Changelog

# [2.0.0](https://github.com/Liv44/Ahimsa/compare/v1.2.0...v2.0.0) (2025-07-18)


### Bug Fixes

* **config:** add supabase env variables for lighthouse ci ([670a202](https://github.com/Liv44/Ahimsa/commit/670a202d433925d88fb204cfde60b67aaa5f2ca1))
* **Connexion:** add environment variable with correct redirection link for connexion ([3f3c2f6](https://github.com/Liv44/Ahimsa/commit/3f3c2f64fb20ddec59586587a34d087f49c262b3))
* **Connexion:** fix width of connexion form ([7e69b73](https://github.com/Liv44/Ahimsa/commit/7e69b73f52eb723e071dbb5eed01dda8bb764e80))


### Features

* **Connexion:** add Profile Page with logout button ([94bb302](https://github.com/Liv44/Ahimsa/commit/94bb302d407b13a09dd09e71620dece3b3f0a13b))
* **Connexion:** add Supabase config, components and useAuth hook ([75c0bb0](https://github.com/Liv44/Ahimsa/commit/75c0bb095a1ba496b0e7c024733561a2329f70d6))
* **Connexion:** add tanstack mutations to login and signin ([7ef91e3](https://github.com/Liv44/Ahimsa/commit/7ef91e3e4a355f1b261d582f3f4e25eccaab70e6))
* **Layout:** add active status to LoginLink when location is /register ([b0aa9a4](https://github.com/Liv44/Ahimsa/commit/b0aa9a4f7b5a02f3fc4e8b7d097d72a225c27a14))


### BREAKING CHANGES

* **Connexion:** Authentification is enabled with magic link

# [1.2.0](https://github.com/Liv44/Ahimsa/compare/v1.1.0...v1.2.0) (2025-07-17)


### Features

* **Discussion:** add error message when a step is not completed ([cfce503](https://github.com/Liv44/Ahimsa/commit/cfce5039b17288b375e245bf45e451bbea6981b2))
* **Discussion:** open step uncompleted ([f60936c](https://github.com/Liv44/Ahimsa/commit/f60936c38f99415d1cc7a3a803e45d6d0bebe6ec))

# [1.1.0](https://github.com/Liv44/Ahimsa/compare/v1.0.1...v1.1.0) (2025-07-16)


### Bug Fixes

* **I12:** hotfix repair revert commit ([062a8f3](https://github.com/Liv44/Ahimsa/commit/062a8f34a1b3f0a2534feadcfed9c1e933715863))
* **I32:** fix bug in discussion modal with toggling categories ([ecb3b3d](https://github.com/Liv44/Ahimsa/commit/ecb3b3d96a86f9177804f51f56c4564d6655a007))
* **I33:** improve discussion modal design ([cc15ae3](https://github.com/Liv44/Ahimsa/commit/cc15ae37da17747c6a9974a3b355ea0c75c24472))


### Features

* **Discussion:** add modal to select words for Feelings and Needs steps ([3f63cb7](https://github.com/Liv44/Ahimsa/commit/3f63cb7126ccb1b00a8338da98d5593777ed0c20))
* **Discussion:** add search bar in modal ([57b5df2](https://github.com/Liv44/Ahimsa/commit/57b5df226d7f67c2f28315ad64400c4274f71ee1))

## [1.0.1](https://github.com/Liv44/Ahimsa/compare/v1.0.0...v1.0.1) (2025-07-07)


### Bug Fixes

* **I10:** delete contact section from footer ([b502dd9](https://github.com/Liv44/Ahimsa/commit/b502dd955e8ca216959cdd78700c62843398be85))
* **I11:** improve toggle feelingsList with header clickable ([5072715](https://github.com/Liv44/Ahimsa/commit/50727156cf7b8e46e977b4baf86be19b25446257))
* **I12:** improve summary sentence from discussion ([aa2cb30](https://github.com/Liv44/Ahimsa/commit/aa2cb30b4793abe4e36e70f309549ae60e2fd279))
* **I20:** add key down space to toggle header of FeelingCard ([2738747](https://github.com/Liv44/Ahimsa/commit/2738747f900dcc8285a9161d60df0bbcb466ddc5))

# [1.0.0](https://github.com/Liv44/Ahimsa/compare/v0.1.3...v1.0.0) (2025-07-06)


### Bug Fixes

* **ci:** lighthouse and linter ([15463ef](https://github.com/Liv44/Ahimsa/commit/15463ef16fa17dfc10188ac5dfa28b4bff367e80))


### Features

* **AnonymousDiscussion:** add discussion entities and all steps for discussion ([4ca94d6](https://github.com/Liv44/Ahimsa/commit/4ca94d63a72ea588257647e93a96cbc4c9292be3))
* **AnonymousDiscussion:** set new route in layout ([16e01e4](https://github.com/Liv44/Ahimsa/commit/16e01e4a8261b316d379d9a732a1408eef7c72fd))
* **ci:** add lighthouse ci to analyse accessibility ([a7ce46c](https://github.com/Liv44/Ahimsa/commit/a7ce46c0275166b5e5c14d57e17b507252605238))
* **config:** add codecov to display coverage on PRs ([5381412](https://github.com/Liv44/Ahimsa/commit/5381412d5b8ddd24d4e1963a3c17cf2152adb26b))
* **lighthouse:** add new routes to test on lighthouse ([a6b7aa9](https://github.com/Liv44/Ahimsa/commit/a6b7aa959c0907164074f037131e9e3c0189a351))


### BREAKING CHANGES

* **AnonymousDiscussion:** add Discussion Feature for Anonymous users

## [0.1.3](https://github.com/Liv44/Ahimsa/compare/v0.1.2...v0.1.3) (2025-07-05)


### Bug Fixes

* **versioning:** change secrets in release.yml to add new releases ([9cefb14](https://github.com/Liv44/Ahimsa/commit/9cefb140cb5d4bd7256bbfaf9784401c8d3cb883))

## [0.1.2](https://github.com/Liv44/Ahimsa/compare/v0.1.1...v0.1.2) (2025-07-05)


### Bug Fixes

* **versioning:** add release-it/bumper to change versions in packages front and back ([8278b5f](https://github.com/Liv44/Ahimsa/commit/8278b5f829545a5a9fa2f2a58ef9ba885a9a642f))

## [0.1.1](https://github.com/Liv44/Ahimsa/compare/v0.1.0...v0.1.1) (2025-07-05)


### Bug Fixes

* **versioning:** repair files link to increase version ([ad60833](https://github.com/Liv44/Ahimsa/commit/ad608335ea9623e2dee87c25c2be78c657a9ece4))

# 0.1.0 (2025-07-05)


### Bug Fixes

* **ci:** change secrets for lighthouse ([f0d5db3](https://github.com/Liv44/Ahimsa/commit/f0d5db3ee4715d76fc379d1b9f191fe8da637ecf))
* **ci:** fix workflows to use yarn ([7e5b946](https://github.com/Liv44/Ahimsa/commit/7e5b9465a193e4c73a27d2891e53f7fd0927430f))
* **deployment:** change setup of CI/CD on github Actions ([ace3c8d](https://github.com/Liv44/Ahimsa/commit/ace3c8d701c18de989b359eb53bb388c88e32d47))
* **linter:** fix warning problems in frontend ([1ecbaf2](https://github.com/Liv44/Ahimsa/commit/1ecbaf2b909cfe9d8ca77684e317f3b96ae26b11))
* **prettier:** add Prettier to frontend ([0a2d169](https://github.com/Liv44/Ahimsa/commit/0a2d169b84c11aeb0a4f186956c187f619aa88d5))


### Features

* **backend:** initialization NestJS ([463525b](https://github.com/Liv44/Ahimsa/commit/463525bd7dc3ed0dcac7d3a7fb3def21f91a63e9))
* **cd:** add deployment on Render with GitHub Actions ([71d5583](https://github.com/Liv44/Ahimsa/commit/71d558333607ff648323c9518ceaa027109be963))
* **ci:** add Github Actions for Continuous Integration ([c96fb01](https://github.com/Liv44/Ahimsa/commit/c96fb016cdbec5c3f6df91b363492d8a76d5286d))
* **ci:** add lighthouse ci to analyse accessibility ([93ee6b3](https://github.com/Liv44/Ahimsa/commit/93ee6b3fb6ce1d52ff492106227539b2523e777c))
* **ci:** add prettier and linter in CI ([9b881fa](https://github.com/Liv44/Ahimsa/commit/9b881fa64d997bc48f3eba2d2b11ba66308818b3))
* **ci:** separate front and back in ci ([535a59c](https://github.com/Liv44/Ahimsa/commit/535a59c995ab13b2ed52c1c60908dc2bfcc7fe3b))
* **config:** add auto release with release-it and Github Actions ([d32c39f](https://github.com/Liv44/Ahimsa/commit/d32c39f8dc284ed6d699efa32d0e756471e72d7b))
* **config:** add conventional commit in commit message with husky ([119cc71](https://github.com/Liv44/Ahimsa/commit/119cc71d3c1fb8f9c949b9944cbd12dc74345a9c))
* **config:** add husky ([ec93d7a](https://github.com/Liv44/Ahimsa/commit/ec93d7aac8666261bd1bb5e66d5d3d8ef94f0d95))
* **frontend): initialisation with react, react router, eslint, prefeat(frontend:** initialisation with react, react router, eslint, prettier ([339eccc](https://github.com/Liv44/Ahimsa/commit/339eccc654ab5d39b883f869b3d27f59ba2078a1))
* **frontend:** add internationalization with i18next ([55b58e2](https://github.com/Liv44/Ahimsa/commit/55b58e2bea8d89b825c718a4f24e95c3d47f85f1))
* **frontend:** add query persistence with tanstack query and store with tanstack store ([719aba2](https://github.com/Liv44/Ahimsa/commit/719aba2680ffe786d50e2003e8cc33466f17a2d3))
* **frontend:** add tailwindcss and shadcn ([81243b4](https://github.com/Liv44/Ahimsa/commit/81243b47718f2cd0b8450b0786c1ff75fca18cda))
* **LandingPage:** add Layoutand home content with tests ([5a10364](https://github.com/Liv44/Ahimsa/commit/5a1036419e7235b2ebc587110fc8ed2101dabe7d))
* **LandingPage:** add needs and feelings list ([ba57720](https://github.com/Liv44/Ahimsa/commit/ba57720ec5c8d2f20cab88e51040599d2c1610f7))
* **LandingPage:** add tests and fix some accessibility items ([ccfd669](https://github.com/Liv44/Ahimsa/commit/ccfd669cb50508adaef4fefd15f0131371219352))
* **tests:** add config to frontend tests with Testing Library and Vitest ([5a71368](https://github.com/Liv44/Ahimsa/commit/5a713680a242856f2330d082db7ba943a63c7fbf))
