import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { GamesModel } from "./games.model"
// import { ClientesDetalhesModel } from "./clientes.model"
// import { ClientesCriarModel } from "./clientes.model"

import { UsuarioLogadoService } from '../../shared/services/usuariologado.service';
import { ServiceBase } from '../../shared/services/servicebase';


@Injectable()
export class GamesService extends ServiceBase {
  constructor(private http: Http, private usuarioLogadoService: UsuarioLogadoService) {
    super();
  }

  getGames() : Observable<GamesModel> {
    let options = this.usuarioLogadoService.getAuthHeader();

    return this.http.get(this.UrlServiceV1 + "Game", options)
      .map((res: Response) => <GamesModel>res.json())
      .catch(super.serviceError);
  }

//   getClienteDetalhe(clienteCodigo: string) : Observable<ClientesDetalhesModel> {
//     let options = this.gestorLogadoService.getAuthHeader();
//     let unidadeNegocioCodigo = this.generalService.getLocalUnidadeNegocio();

//     return this.http.get(this.UrlServiceV1 + "Cliente/Detalhes" + "?clienteCodigoReferencia=" + clienteCodigo + "&unidadeNegocioCodigo=" + unidadeNegocioCodigo.unidadeNegocioCodigo, options)
//       .map((res: Response) => <ClientesDetalhesModel>res.json())
//       .catch(super.serviceError);
//   }

//   postCliente(cliente: ClientesCriarModel) : Observable<string> {
//     let options = this.gestorLogadoService.getAuthHeader();
//     let unidadeNegocioCodigo = this.generalService.getLocalUnidadeNegocio();

//     var body = '{' + 
//                  '"Nome":"' + cliente.nome + '",' + 
//                  '"TipoDocumentoCodigo":"' + cliente.tipoDocumentoCodigo + '",' +
//                  '"Documento":"' + cliente.documento + '",' +
//                  '"DataNascimento":' + cliente.dataNascimento + ',' +
//                  '"Email":"' + cliente.email + '",' +
//                  '"Telefone":"' + cliente.telefone + '",' +
//                  '"Celular":"' + cliente.celular + '",' +
//                  '"ResponsavelLegalCodigo":"' + cliente.responsavelLegalCodigo + '",' +
//                  '"Observacao":"' + cliente.observacao + '",' +
//                  '"Logradouro":"' + cliente.logradouro + '",' +
//                  '"Numero":"' + cliente.numero + '",' +
//                  '"Bairro":"' + cliente.bairro + '",' +
//                  '"Complemento":"' + cliente.complemento + '",' +
//                  '"Cep":"' + cliente.cep + '",' +
//                  '"Cidade":"' + cliente.cidade + '",' +
//                  '"Uf":"' + cliente.uf + '",' +
//                  '"Estado":"' + cliente.estado + '",' +
//                  '"PaisCodigo":"' + cliente.paisCodigo + '"' +
//                 '}';

//     let response = this.http.post(this.UrlServiceV1 + "Cliente/Criar" + "?unidadeNegocioCodigo=" + unidadeNegocioCodigo.unidadeNegocioCodigo, body, options)
//                             .map(this.extractData)
//                             .catch((super.serviceError));
        
//     return response;
//   }

//   deleteCliente(clienteCodigo: string) : Observable<string> {
//     let options = this.gestorLogadoService.getAuthHeader();
//     let unidadeNegocioCodigo = this.generalService.getLocalUnidadeNegocio();

//     let response = this.http.delete(this.UrlServiceV1 + "Cliente/Deletar" + "?clienteCodigoReferencia=" + clienteCodigo + "&unidadeNegocioCodigo=" + unidadeNegocioCodigo.unidadeNegocioCodigo, options)
//                             .map(this.extractData)
//                             .catch((super.serviceError));
        
//     return response;
//   }
}