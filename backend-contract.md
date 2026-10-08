# RIANG Backend Contract

Dokumen ini merangkum kontrak backend yang dipakai oleh frontend rebuild.

## GET

`GET API_URL`

Response minimal:

```json
{
  "media": [],
  "contributors": [],
  "testimonials": [],
  "reports": []
}
```

## POST

Request:

```json
{
  "action": "ACTION_NAME",
  "data": { }
}
```

Frontend menambahkan `_actorName` dan `_actorRole` ke payload.

## Action

### Media
- `ADD_MEDIA`
- `EDIT_MEDIA`
- `DELETE_MEDIA`
- `TOGGLE_LIKE`

### Kontributor
- `ADD_CONTRIB`
- `EDIT_CONTRIB`
- `DELETE_CONTRIB`

### Testimoni
- `ADD_TESTI`
- `EDIT_TESTI`
- `DELETE_TESTI`

### Moderasi
- `REPORT_MEDIA`
