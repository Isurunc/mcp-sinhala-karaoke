#!/usr/bin/env node
import { spawn } from "child_process";
import {
  getSongById,
  searchSongs,
  getSongsByGenre,
  getSongsByArtist,
  sinhalaSongs,
  KaraokeSong,
} from "./data.js";

interface MCPRequest {
  jsonrpc: string;
  id: number | string;
  method: string;
  params?: unknown;
}

interface MCPResponse {
  jsonrpc: string;
  id: number | string;
  result?: unknown;
  error?: { code: number; message: string };
}

function formatSong(song: KaraokeSong): string {
  return `
ID: ${song.id}
Title: ${song.title} (${song.titleSinhala})
Artist: ${song.artist} (${song.artistSinhala})
Album: ${song.album}
Duration: ${song.duration} seconds
Genre: ${song.genre}
Year: ${song.year}
Description: ${song.description}
${song.lyrics ? `Lyrics: ${song.lyrics}` : ""}
`;
}

const tools = [
  {
    name: "get_song",
    description:
      "Get a specific Sinhala karaoke song by ID. Returns the song details including title, artist, duration, genre, and other metadata.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The ID of the song to retrieve",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "search_songs",
    description:
      "Search for Sinhala karaoke songs by title, artist, or keyword. Returns matching songs with their details.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Search query - can be song title, artist name, or keyword",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_songs_by_genre",
    description:
      "Get all Sinhala karaoke songs of a specific genre. Available genres: Classical, Traditional, Modern Classical, Light Music, Devotional, Romantic, Motivational.",
    inputSchema: {
      type: "object",
      properties: {
        genre: {
          type: "string",
          description: "The genre to filter by",
        },
      },
      required: ["genre"],
    },
  },
  {
    name: "get_songs_by_artist",
    description:
      "Get all songs by a specific artist. Provide the artist name in English or Sinhala script.",
    inputSchema: {
      type: "object",
      properties: {
        artist: {
          type: "string",
          description: "The artist name to filter by",
        },
      },
      required: ["artist"],
    },
  },
  {
    name: "list_all_songs",
    description:
      "List all available Sinhala karaoke songs in the database with their basic information.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_artists",
    description: "Get a list of all unique artists in the karaoke database.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_genres",
    description:
      "Get a list of all available music genres in the karaoke database.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

function handleRequest(request: MCPRequest): MCPResponse {
  const { method, params, id } = request;

  try {
    let result: unknown;

    if (method === "tools/list") {
      result = { tools };
    } else if (method === "tools/call") {
      const callParams = params as { name: string; arguments?: unknown };
      const toolName = callParams.name;
      const args = callParams.arguments as Record<string, unknown>;

      let content: { type: string; text: string };

      switch (toolName) {
        case "get_song": {
          const song = getSongById(String(args.id));
          if (!song) {
            content = {
              type: "text",
              text: `Song with ID "${args.id}" not found.`,
            };
          } else {
            content = {
              type: "text",
              text: formatSong(song),
            };
          }
          break;
        }

        case "search_songs": {
          const results = searchSongs(String(args.query));
          if (results.length === 0) {
            content = {
              type: "text",
              text: `No songs found matching query: "${args.query}"`,
            };
          } else {
            content = {
              type: "text",
              text: `Found ${results.length} song(s):\n\n${results.map(formatSong).join("\n")}`,
            };
          }
          break;
        }

        case "get_songs_by_genre": {
          const results = getSongsByGenre(String(args.genre));
          if (results.length === 0) {
            content = {
              type: "text",
              text: `No songs found in genre: "${args.genre}"`,
            };
          } else {
            content = {
              type: "text",
              text: `Found ${results.length} song(s) in "${args.genre}" genre:\n\n${results.map(formatSong).join("\n")}`,
            };
          }
          break;
        }

        case "get_songs_by_artist": {
          const results = getSongsByArtist(String(args.artist));
          if (results.length === 0) {
            content = {
              type: "text",
              text: `No songs found by artist: "${args.artist}"`,
            };
          } else {
            content = {
              type: "text",
              text: `Found ${results.length} song(s) by ${args.artist}:\n\n${results.map(formatSong).join("\n")}`,
            };
          }
          break;
        }

        case "list_all_songs": {
          const songList = sinhalaSongs
            .map((song) => `${song.id}. ${song.title} (${song.titleSinhala}) - ${song.artist}`)
            .join("\n");
          content = {
            type: "text",
            text: `Total songs: ${sinhalaSongs.length}\n\n${songList}`,
          };
          break;
        }

        case "get_artists": {
          const uniqueArtists = [
            ...new Set(
              sinhalaSongs.map((song) => `${song.artist} (${song.artistSinhala})`),
            ),
          ].sort();
          content = {
            type: "text",
            text: `Total artists: ${uniqueArtists.length}\n\n${uniqueArtists.join("\n")}`,
          };
          break;
        }

        case "get_genres": {
          const uniqueGenres = [...new Set(sinhalaSongs.map((song) => song.genre))].sort();
          content = {
            type: "text",
            text: `Available genres:\n\n${uniqueGenres.join("\n")}`,
          };
          break;
        }

        default:
          content = {
            type: "text",
            text: `Unknown tool: ${toolName}`,
          };
      }

      result = { content: [content] };
    } else {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Unknown method: ${method}` },
      };
    }

    return {
      jsonrpc: "2.0",
      id,
      result,
    };
  } catch (error) {
    return {
      jsonrpc: "2.0",
      id,
      error: {
        code: -32603,
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

// Main loop
async function main() {
  const readline = await import("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.error("Sinhala Karaoke MCP Server started");

  rl.on("line", (line: string) => {
    try {
      const request = JSON.parse(line);
      const response = handleRequest(request);
      console.log(JSON.stringify(response));
    } catch (error) {
      console.error("Error processing request:", error);
    }
  });

  rl.on("close", () => {
    process.exit(0);
  });
}

main().catch(console.error);
