import Image from 'next/image';
import styles from './display.module.css';

interface IProps {
  post: any;
}

function Display({ post }: IProps) {
  if (!post) return <></>;

  if (post.video) {
    return (
      <>
        <a href={post.video.url}>Link do video</a>
        <video src={post.video.url} controls height={500}>
          Your browser does not support the video tag.
        </video>
      </>
    );
  } else if (post.carousel_media.length > 0) {
    return (
      <div className={styles.carousel}>
        {post.carousel_media.map((image: any) => (
          <Image
            key={image.url}
            src={image.url}
            alt="teste"
            width={image.width}
            height={image.height}
          ></Image>
        ))}
      </div>
    );
  } else {
    return (
      <Image
        key={post.images[0].url}
        src={post.images[0].url}
        alt="teste"
        width={post.images[0].width}
        height={post.images[0].height}
      ></Image>
    );
  }
}

export { Display };
