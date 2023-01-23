import type { Lists } from '.keystone/types';
import User from './user';
import Game from './game';
import Tag from './tag';
import Analytic from './analytics';

export const lists: Lists = {
  User,
  Game,
  Tag,
  Analytic
};
