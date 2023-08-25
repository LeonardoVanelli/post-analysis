'use client';

import { Display } from '@/components/Display';
import { Info } from '@/components/Info';
import { PostToCsvBuilder } from '@/utils/PostToCsvBuilder';
import { booleanToString } from '@/utils/boolean';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [post, setPost] = useState<any>(null);
  const [accountName, setAccountName] = useState<any>('');

  async function getPost() {
    if (accountName) {
      const response = await axios.get('api/posts', {
        params: {
          max_id: post ? post.id : '',
          count: 2,
          account_name: accountName,
        },
      });

      setPost(response.data);
    }
  }

  const copyToClipboard = () => {
    const postToCsvBuilder = new PostToCsvBuilder();
    postToCsvBuilder.addPost(post);

    navigator.clipboard.writeText(postToCsvBuilder.build());
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    console.log(post?.video?.url ?? 'não é vídeo');
  }, [post]);

  const handleClickNext = () => {
    getPost();
  };

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        {post && (
          <>
            <div className={styles.infos}>
              <Info label="Postado em">{post.created_at}</Info>
              <Info label="Link">
                <a href={post.url}>{post.url}</a>
              </Info>
              <Info label="Foto ou vídeos">
                {post.video ? 'Vídeo' : 'Foto'}
              </Info>
              <Info label="Tem hashtag">
                {booleanToString(post.has_hashtag)}
              </Info>
              <Info label="Hora útil">
                {booleanToString(post.is_working_hours)}
              </Info>
              <Info label="Dia útil">{booleanToString(post.is_weekday)}</Info>
              <Info label="Caracteres na legenda">
                {post.description_count}
              </Info>
              <Info label="Curtidas">{post.like_count}</Info>
              <Info label="Comentários">{post.comment_count}</Info>
              <Info label="Tem áudio">{booleanToString(post.has_audio)}</Info>
            </div>

            <p>{post.description}</p>
          </>
        )}

        <Display post={post} />

        <div className={styles.footer}>
          <label>Nome da conta</label>
          <input
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          <button onClick={handleClickNext}>Próximo</button>
          <button onClick={copyToClipboard}>Copiar linha para CSV</button>
        </div>
      </div>
    </main>
  );
}
