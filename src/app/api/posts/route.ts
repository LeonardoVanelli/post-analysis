import { getPosts } from '@/services/getPosts';
import { PostToCsvBuilder } from '@/utils/PostToCsvBuilder';
import { isWeekday, isWorkingHours } from '@/utils/date';
import { format } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const count = searchParams.get('count');
  const max_id = searchParams.get('max_id');
  const account_name = searchParams.get('account_name');

  const maxId = max_id ? String(max_id) : null;
  const accountName = String(account_name);
  const postsInfos = await getPosts(maxId, Number(count), accountName);
  const posts = postsInfos.items;

  const postsFormatted = posts.map((post: any) => {
    let video: any = null;
    if (post.video_versions) {
      video = {
        url: post.video_versions[0].url,
      };
    }

    let images: any = null;
    if (post.image_versions2) {
      images = post.image_versions2.candidates.filter(
        (candidate: any) => candidate.width === 480
      );
    }

    let carousel_media: any = [];
    if (post.carousel_media) {
      post.carousel_media.map((cm: any) => {
        const cmFiltered = cm.image_versions2.candidates.find(
          (candidate: any) =>
            candidate.width === 480 && candidate.height === 600
        );

        carousel_media.push(cmFiltered);
      });
    }

    const created_at = new Date(post.caption.created_at_utc * 1000);

    const postFormatted = {
      id: post.id,
      like_count: post.like_count,
      original_width: post.original_width,
      original_height: post.original_height,
      comment_count: post.comment_count,
      created_at,
      description: post.caption.text,
      description_count: post.caption.text.length,
      has_hashtag: post.caption.text.includes('#'),
      video,
      images: images,
      media_type: post.media_type,
      code: post.code,
      url: `https://www.instagram.com/p/${post.code}`,
      next_max_id: posts.next_max_id,
      carousel_media,
      has_audio: post.has_audio,
      is_weekday: isWeekday(created_at),
      is_working_hours: isWorkingHours(created_at),
      is_photo: video ? false : true,
      is_video: video ? true : false,
      date: format(created_at, 'dd/MM'),
      time: format(created_at, 'hh:mm'),
    };

    const postToCsvBuilder = new PostToCsvBuilder();
    postToCsvBuilder.addPost(postFormatted);

    return {
      ...postFormatted,
      csvLine: postToCsvBuilder.build(),
    };
  });

  return NextResponse.json(
    { items: postsFormatted, next_max_id: posts.next_max_id },
    { status: 200 }
  );
}
