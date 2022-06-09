<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'nome_completo' => $this->NOME_COMPLETO,
            'usuario_id' => $this->USUARIO_ID,
            'login' => $this->LOGIN,
            'ativo' => $this->ATIVO,
            'autorizacoes' => AutorizacaoResource::collection($this->whenLoaded('autorizacoes')),
        ];
    }
}
