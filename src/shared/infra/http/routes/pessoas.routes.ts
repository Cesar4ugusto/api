import { Router } from "express";

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
import multer from "multer";
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

pessoas_route.patch("/:id_pessoa/avatar", uploadAvatar.single("avatar"), addAvatar.handle);
pessoas_route.post("/:id_pessoa/enderecos", addEndereco.handle);
pessoas_route.post("/:id_pessoa/telefones", addTelefone.handle);
pessoas_route.post("/", create.handle);
pessoas_route.delete("/enderecos/:id_endereco", delEndereco.handle);
pessoas_route.delete("/:id_pessoa", del.handle);
pessoas_route.delete("/telefones/:id_telefone", delTelefone.handle);
pessoas_route.put("/enderecos/:id_endereco", editEndereco.handle);
pessoas_route.put("/:id_pessoa", edit.handle);
pessoas_route.put("/telefones/:id_telefone", editTelefone.handle);
pessoas_route.get("/", list.handle);
pessoas_route.get("/:id_pessoa", search.handle);


export { pessoas_route };
