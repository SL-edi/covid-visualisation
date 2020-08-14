import { InjectionToken } from '@angular/core';

import { NewsService } from './services/news.service';

export const NEWS_SERVICE = new InjectionToken<NewsService>('NewsService');
