# Story Choice Continuity Matrix

These are design notes for the November story expansion, not yet wired into runtime gameplay.

| Chapter | Player decision | Later acknowledgement |
|---|---|---|
| The Last Tram | Full archive / verified public copy | Arun's dialogue and archive journal |
| River of Names | Ghat entrance / reading room | Noticeboard landmark description |
| College Street Echoes | Rare books / everyday reading | Reading-room journal entry |
| Monsoon Postcards | Chronological / neighbourhood voices | Exhibition journal summary |
| The Green Promise | Garden time / public events | Park volunteer dialogue |
| Howrah at Dawn | Shared vendor list / independent routine | Breakfast-stall dialogue |
| The Archive Window | Permission-only / smaller public timeline | Archivist dialogue |
| Market of Morning | Product groups / lane groups | Market organiser dialogue |
| Lights Over the Ghat | Resident / youth volunteer closing | Finale epilogue |

## Implementation contract
- Choices must never erase existing save data.
- New story flags must be optional and default safely for older saves.
- No choice should soft-lock the main campaign.
- Journal text should explain consequences without revealing future beats.
- Runtime integration and automated coverage are separate follow-up work.
