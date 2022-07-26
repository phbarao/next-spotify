import { useEffect, useState } from 'react';

type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export default function NowPlaying() {
  const [song, setSong] = useState<NowPlayingSong>();

  useEffect(() => {
    async function getData() {
      const response = await fetch('/api/now-playing');
      const data: NowPlayingSong = await response.json();

      setSong(data);
    }

    getData();
  }, []);

  console.log(song);

  return (
    <div className="flex flex-row-reverse items-center sm:flex-row mb-8 space-x-0 sm:space-x-2 border-2 p-2 rounded-md">
      <div className="capsize text-gray-800 font-medium max-w-max truncate">
        {song?.songUrl ? (
          <a
            className="capsize text-gray-800 font-medium max-w-max truncate"
            href={song.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {song.title}
          </a>
        ) : (
          <p className="capsize text-gray-800 font-medium">
            Nenhuma música tocando no momento....
          </p>
        )}

        {song?.artist && (
          <p className="capsize text-gray-500 max-w-max truncate">
            {song?.artist ?? 'Spotify'}
          </p>
        )}
      </div>
    </div>
  );
}
