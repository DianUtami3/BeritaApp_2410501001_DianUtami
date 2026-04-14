import * as Clipboard from 'expo-clipboard';
import { Share, Alert } from 'react-native';
import { Article } from '../types/news';

export const shareArticle = async (article: Article) => {
  try {
    await Share.share({
      message: `${article.title}\n\n${article.url}`,
      url: article.url,
      title: article.title,
    });
  } catch (error) {
    console.log('Share gagal, salin ke clipboard:', error);
    await Clipboard.setStringAsync(article.url);
    Alert.alert('Info', 'Link artikel disalin ke clipboard');
  }
};