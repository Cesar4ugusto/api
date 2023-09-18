import { container } from "tsyringe";
import { LibGeral } from "./implementations/LibGeral";
import { Storage } from "./implementations/Storage";
import { ILibGeral } from "./ILibGeral";
import { IStorage } from "./IStorage";

container.registerSingleton<ILibGeral>("Library", LibGeral);
container.registerSingleton<IStorage>("Storage", Storage);
