'use client';

import { booleanToString } from '@/utils/boolean';
import axios from 'axios';
import { useState } from 'react';
import { Info } from '../Info';

function AutoProcess() {
  const [posts, setPosts] = useState<any[]>([]);
  const [lastPostId, setLastPostsId] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<any>('');

  async function getPosts() {
    if (accountName) {
      const response = await axios.get('api/posts', {
        params: {
          max_id: lastPostId,
          count: 12,
          account_name: accountName,
        },
      });

      setPosts([...posts, ...response.data.items]);
      setLastPostsId(response.data.next_max_id);
    }
  }

  const copyToClipboard = () => {
    const postsCsv = posts.map((post) => post.csvLine).join('\n');

    navigator.clipboard.writeText(postsCsv);
  };

  const startProcess = () => {
    getPosts();
  };

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Link</th>
              <th>Post</th>
              <th>Foto</th>
              <th>Gráfico</th>
              <th>Gif</th>
              <th>Foto editada</th>
              <th>Video</th>
              <th>Evento Offline</th>
              <th>Carrossel</th>
              <th>Video com som</th>
              <th>Votação</th>
              <th>Hashtag</th>
              <th>Sorteio</th>
              <th>Chamada para ação</th>
              <th>Menção</th>
              <th>Pergunta</th>
              <th>Câmera subjetiva</th>
              <th>Câmera frontal</th>
              <th>Informacional</th>
              <th>Entretenimento</th>
              <th>Post em hora útil</th>
              <th>Post em dia útil</th>
              <th>Número de caracteres</th>
              <th>Curtidas</th>
              <th>Comentário</th>
              <th>Seguidores</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.date}</td>
                <td>
                  <a href={post.url}>{post.url}</a>
                </td>
                <td>{}</td>
                <td>{booleanToString(post.is_photo)}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{booleanToString(post.is_video)}</td>
                <td></td>
                <td></td>
                <td>{booleanToString(post.has_audio)}</td>
                <td></td>
                <td>{booleanToString(post.has_hashtag)}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{post.is_working_hours}</td>
                <td>{post.is_weekday}</td>
                <td>{post.description_count}</td>
                <td>{post.like_count}</td>
                <td>{post.comment_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <input
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <button onClick={startProcess}>Consultar + 23 registros</button>
        <button onClick={copyToClipboard}>Copiar linhas para CSV</button>
      </div>
      <div>
        <Info label="Quantidade de posts consultados">
          {posts.length.toString()}
        </Info>
      </div>
    </div>
  );
}

export { AutoProcess };
