# plans-de-compte

Ce projet a pour objet de maintenir à jour une liste accessible de plans de compte.

## Usage

Télécharger [Deno](https://deno.land/#installation) v1.5.1.

```bash
deno run --allow-net --allow-write main.ts
```

## Origines

Les plans de compte officiels sont disponibles [ici](http://odm-budgetaire.org/composants/normes/).

Néanmoins, ils ne sont pas accessibles depuis un script extérieur à cause des CORS, et ne sont pas encodés en UTF-8.
