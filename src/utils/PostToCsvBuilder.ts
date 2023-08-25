class PostToCsvBuilder {
  order: string[] = [];
  post: any;

  constructor() {
    //Foto,Gráfico,Gif,Foto editada,Vídeo,Evento Offline,Carrossel,Vídeo com som,Votação,Hashtag,Sorteio,Chamada para ação,Menção,Pergunta,Câmera subjetiva,Câmera frontal,Informacional,Entretenimento,Hora da postagem,Dia da postagem,Número de caracteres
    this.order = [
      'date',
      'url',
      '',
      'is_photo',
      '',
      '',
      '',
      'is_video',
      '',
      'is_carousel',
      'has_audio',
      '',
      'has_hashtag',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'is_working_hours',
      'is_weekday',
      'description_count',
      'like_count',
      'comment_count',
    ];
  }

  addPost(post: any) {
    this.post = post;
  }

  build() {
    const csvLines = this.order
      .map((itemOrder) => {
        const value = this.post[itemOrder] ?? '';
        if (typeof value === 'boolean') {
          return value ? '1' : '0';
        }
        return value;
      })
      .join(',');

    return csvLines;
  }
}

export { PostToCsvBuilder };
