# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.2.10](https://github.com/ffxiv-teamcraft/simulator/compare/v1.2.9...v1.2.10) (2019-07-22)


### Bug Fixes

* do not tick buffs if synth has already ended ([00a27b8](https://github.com/ffxiv-teamcraft/simulator/commit/00a27b8))



### [1.2.9](https://github.com/ffxiv-teamcraft/simulator/compare/v1.2.8...v1.2.9) (2019-07-15)


### Bug Fixes

* fixed an issue with trained hand and delicate synthesis ceiling instead of flooring ([d4f1a53](https://github.com/ffxiv-teamcraft/simulator/commit/d4f1a53)), closes [#4](https://github.com/ffxiv-teamcraft/simulator/issues/4)



### [1.2.8](https://github.com/ffxiv-teamcraft/simulator/compare/v1.2.7...v1.2.8) (2019-07-12)


### Bug Fixes

* **ingenuity:** fixed ingenuity accuracy on lower level, still not perfect tho ([77ee553](https://github.com/ffxiv-teamcraft/simulator/commit/77ee553))



### [1.2.7](https://github.com/ffxiv-teamcraft/simulator/compare/v1.2.6...v1.2.7) (2019-07-12)


### Bug Fixes

* made buff action buff and initial stacks public ([ac6b407](https://github.com/ffxiv-teamcraft/simulator/commit/ac6b407))



### [1.2.6](https://github.com/ffxiv-teamcraft/simulator/compare/v1.2.5...v1.2.6) (2019-07-12)


### Bug Fixes

* fixed missing id for preparatory touch ([09ed2cf](https://github.com/ffxiv-teamcraft/simulator/commit/09ed2cf))
* **registry:** added missing craft optimizer import entries ([2dff767](https://github.com/ffxiv-teamcraft/simulator/commit/2dff767))
* **registry:** fixed wrong shortName for rapid synth 3 ([aeebf26](https://github.com/ffxiv-teamcraft/simulator/commit/aeebf26))



### [1.2.5](https://github.com/ffxiv-teamcraft/simulator/compare/v1.2.4...v1.2.5) (2019-07-10)


### Bug Fixes

* fixed wrong level for Delicate Synthesis ([0ec8ae0](https://github.com/ffxiv-teamcraft/simulator/commit/0ec8ae0))



### [1.2.4](https://github.com/ffxiv-teamcraft/simulator/compare/v1.2.3...v1.2.4) (2019-07-04)


### Bug Fixes

* fixed an issue with force failed actions not being failed properly ([0c96e4b](https://github.com/ffxiv-teamcraft/simulator/commit/0c96e4b))



### [1.2.3](https://github.com/ffxiv-teamcraft/simulator/compare/v1.2.2...v1.2.3) (2019-07-03)


### Bug Fixes

* **registry:** fixed an issue with rotation serialization ([04dc280](https://github.com/ffxiv-teamcraft/simulator/commit/04dc280))



### [1.2.2](https://github.com/ffxiv-teamcraft/simulator/compare/v1.2.1...v1.2.2) (2019-07-03)


### Bug Fixes

* **patient-touch:** fixed a bug with patient touch onFail method ([be16f33](https://github.com/ffxiv-teamcraft/simulator/commit/be16f33))



### [1.2.1](https://github.com/ffxiv-teamcraft/simulator/compare/v1.2.0...v1.2.1) (2019-07-01)


### Bug Fixes

* fixed ingenuity behavior for stormblood and shadowbringers ([d3c4482](https://github.com/ffxiv-teamcraft/simulator/commit/d3c4482))



## [1.2.0](https://github.com/ffxiv-teamcraft/simulator/compare/v1.1.1...v1.2.0) (2019-06-30)


### Bug Fixes

* fixed an issue with trained actions being usable when they shouldn't ([5969ab9](https://github.com/ffxiv-teamcraft/simulator/commit/5969ab9))
* fixed broken id on steady hand II for CUL ([d3943b5](https://github.com/ffxiv-teamcraft/simulator/commit/d3943b5))
* fixed wrong precision with HQ ingredients quality ([e68ddad](https://github.com/ffxiv-teamcraft/simulator/commit/e68ddad))


### Features

* implemented real ingame formula into the simulator ([3e2a778](https://github.com/ffxiv-teamcraft/simulator/commit/3e2a778))



### [1.1.1](https://github.com/ffxiv-teamcraft/simulator/compare/v1.1.0...v1.1.1) (2019-06-29)


### Bug Fixes

* getBaseProgression and getBaseQuality are now public for UI purpose ([d6c13f4](https://github.com/ffxiv-teamcraft/simulator/commit/d6c13f4))



## [1.1.0](https://github.com/ffxiv-teamcraft/simulator/compare/v1.1.0-beta.7...v1.1.0) (2019-06-29)


### Features

* **rapid-synthesis-iii:** fixed potency penalty for when durability < 20 ([a1b895b](https://github.com/ffxiv-teamcraft/simulator/commit/a1b895b))



## [1.1.0-beta.7](https://github.com/ffxiv-teamcraft/simulator/compare/v1.1.0-beta.6...v1.1.0-beta.7) (2019-06-28)


### Features

* implemented reuse buff ([134fddc](https://github.com/ffxiv-teamcraft/simulator/commit/134fddc))



## [1.1.0-beta.6](https://github.com/ffxiv-teamcraft/simulator/compare/v1.1.0-beta.5...v1.1.0-beta.6) (2019-06-28)


### Bug Fixes

* **delicate-synthesis:** fixed an issue making it give 2 stacks instead of only one ([48e96ff](https://github.com/ffxiv-teamcraft/simulator/commit/48e96ff))



## [1.1.0-beta.5](https://github.com/ffxiv-teamcraft/simulator/compare/v1.1.0-beta.4...v1.1.0-beta.5) (2019-06-28)


### Bug Fixes

* fixed an issue with delicate synthesis being unusable ([eabe4f6](https://github.com/ffxiv-teamcraft/simulator/commit/eabe4f6))



## [1.1.0-beta.4](https://github.com/ffxiv-teamcraft/simulator/compare/v1.1.0-beta.3...v1.1.0-beta.4) (2019-06-28)


### Features

* added new skills from the shadowbringers patch ([545d827](https://github.com/ffxiv-teamcraft/simulator/commit/545d827))



## [1.1.0-beta.3](https://github.com/ffxiv-teamcraft/simulator/compare/v1.1.0-beta.2...v1.1.0-beta.3) (2019-06-27)


### Bug Fixes

* fixed an issue with name of elements never being usable ([e432236](https://github.com/ffxiv-teamcraft/simulator/commit/e432236))



## [1.1.0-beta.2](https://github.com/ffxiv-teamcraft/simulator/compare/v1.1.0-beta.1...v1.1.0-beta.2) (2019-06-26)



## [1.1.0-beta.1](https://github.com/ffxiv-teamcraft/simulator/compare/v1.1.0-beta.0...v1.1.0-beta.1) (2019-06-26)



## [1.1.0-beta.0](https://github.com/ffxiv-teamcraft/simulator/compare/v1.0.5...v1.1.0-beta.0) (2019-06-26)


### Features

* implemented changes from preliminary 5.0 patch notes ([147192b](https://github.com/ffxiv-teamcraft/simulator/commit/147192b))



### [1.0.5](https://github.com/ffxiv-teamcraft/simulator/compare/v1.0.4...v1.0.5) (2019-06-23)


### Bug Fixes

* fixed a bug with last name of XXX change ([eb5e551](https://github.com/ffxiv-teamcraft/simulator/commit/eb5e551))



### [1.0.4](https://github.com/ffxiv-teamcraft/simulator/compare/v1.0.3...v1.0.4) (2019-06-23)


### Bug Fixes

* fixed a bug allowing you to use Name of XXX twice in a rotation ([925335e](https://github.com/ffxiv-teamcraft/simulator/commit/925335e))



### [1.0.3](https://github.com/ffxiv-teamcraft/simulator/compare/v1.0.2...v1.0.3) (2019-06-18)


### Bug Fixes

* **core:** removed unused fields from craft model ([80ad140](https://github.com/ffxiv-teamcraft/simulator/commit/80ad140))



### [1.0.2](https://github.com/ffxiv-teamcraft/simulator/compare/v1.0.1...v1.0.2) (2019-06-15)


### Bug Fixes

* **build:** fixed typing path for npm publish ([5302eff](https://github.com/ffxiv-teamcraft/simulator/commit/5302eff))



### [1.0.1](https://github.com/ffxiv-teamcraft/simulator/compare/v1.0.0...v1.0.1) (2019-06-15)



## [1.0.0](https://github.com/ffxiv-teamcraft/simulator/compare/v0.0.2...v1.0.0) (2019-06-15)
