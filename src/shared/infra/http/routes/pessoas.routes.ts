import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import uploadConfig from "@/config/upload";

import { AddEndereçoPessoaController } from "@/modules/pessoas/usecases/AddEnderecoPessoa/AddEnderecoPessoaController";
import { AddTelefonePessoaController } from "@/modules/pessoas/usecases/AddTelefonePessoa/AddTelefonePessoaController";
import { CreatePessoasController } from "@/modules/pessoas/usecases/CreatePessoas/CreatePessoasController";
import { DeleteEnderecoPessoaController } from "@/modules/pessoas/usecases/DeleteEnderecoPessoa/DeleteEnderecoPessoaController";
import { DeletePessoasController } from "@/modules/pessoas/usecases/DeletePessoas/DeletePessoasController";
import { DeleteTelefonePessoaController } from "@/modules/pessoas/usecases/DeleteTelefonePessoa/DeleteTelefonePessoaController";
import { EditEndereçoPessoaController } from "@/modules/pessoas/usecases/EditEnderecoPessoa/EditEnderecoPessoaController";
import { EditPessoasController } from "@/modules/pessoas/usecases/EditPesssoas/EditPessoasController";
import { EditTelefonePessoaController } from "@/modules/pessoas/usecases/EditTelefonePessoa/EditTelefonePessoaController";
import { ListPessoasController } from "@/modules/pessoas/usecases/ListPessoas/ListPessoasController";
import { SearchPessoaController } from "@/modules/pessoas/usecases/SearchPessoa/SearchPessoaController";
import { AddAvatarPessoaController } from "@/modules/pessoas/usecases/AddAvatarPessoa/AddAvatarPessoaController";

const uploadAvatar = multer(uploadConfig);

const pessoas_route = Router();

const addAvatar = new AddAvatarPessoaController();
const addEndereco = new AddEndereçoPessoaController();
const addTelefone = new AddTelefonePessoaController();
const create = new CreatePessoasController();
const delEndereco = new DeleteEnderecoPessoaController();
const del = new DeletePessoasController();
const delTelefone = new DeleteTelefonePessoaController();
const editEndereco = new EditEndereçoPessoaController();
const edit = new EditPessoasController();
const editTelefone = new EditTelefonePessoaController();
const list = new ListPessoasController();
const search = new SearchPessoaController();

pessoas_route.patch("/:id_pessoa/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), addAvatar.handle);
pessoas_route.post("/:id_pessoa/enderecos", ensureAuthenticated, addEndereco.handle);
pessoas_route.post("/:id_pessoa/telefones", ensureAuthenticated, addTelefone.handle);
pessoas_route.post("/", ensureAuthenticated, create.handle);
pessoas_route.delete("/enderecos/:id_endereco", ensureAuthenticated, delEndereco.handle);
pessoas_route.delete("/:id_pessoa", ensureAuthenticated, del.handle);
pessoas_route.delete("/telefones/:id_telefone", ensureAuthenticated, delTelefone.handle);
pessoas_route.put("/:id_pessoa/enderecos/:id_endereco", ensureAuthenticated, editEndereco.handle);
pessoas_route.put("/:id_pessoa", ensureAuthenticated, edit.handle);
pessoas_route.put("/:id_pessoa/telefones/:id_telefone", ensureAuthenticated, editTelefone.handle);
pessoas_route.get("/", ensureAuthenticated, ensureAuthenticated, list.handle);
pessoas_route.get("/:id_pessoa", ensureAuthenticated, search.handle);


export { pessoas_route };
