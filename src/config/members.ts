export interface Member {
  /** 公开姓名 / 昵称 */
  name: string;
  /** 稳定 slug，用于成员详情路由 /team/[slug] */
  slug: string;
  /** 角色，如「联合创始人 · 软件架构师」 */
  role: string;
  /** 主要技术方向 */
  focus: string;
  /** 卡片上的一句话简介 */
  bio: string;
  /** 详情页的详细介绍（可选） */
  about?: string;
  /** 头像路径，建议放在 public/img/avatars/ 下 */
  avatar: string;
  skills: string[];
  /** 列表排序，越小越靠前 */
  order: number;
  /** 加入时间（可选） */
  joinedDate?: string;
  /** 示例内容标记，发布真实内容后请改为 false 或删除 */
  demo?: boolean;
  links?: {
    website?: string;
    github?: string;
    blog?: string;
  };
}

export const MEMBERS: Member[] = [
  {
    name: '琴泠Lumina Qin',
    slug: 'Lumina',
    role: '组织者，主要成员，独立项目开发者',
    focus: '全栈开发，产品设计，游戏开发',
    bio: '相信兴趣是学习一件新的事物中最重要的东西。独立开发者，关注 AI 应用、开源软件与游戏开发。喜欢折腾新技术、把想法变成可运行的作品，也乐于与不同领域的伙伴协作。',
    about:
      '独立开发者，热衷于 AI 应用、开源软件与游戏开发，喜欢探索新技术，也乐于与伙伴一起创造有趣的项目。',
    avatar: '/img/avatars/Lumina.jpg',
    skills: ['Python', 'AI', 'TypeScript', 'PixiArt'],
    order: 1,
    joinedDate: '2024-03-19',
    demo: false,
    links: {
      github: 'https://github.com/Yunease',
      blog: 'https://vilstia.org'
    },
  },
];

/** 按 order 排序后的成员列表 */
export const SORTED_MEMBERS: Member[] = [...MEMBERS].sort(
  (a, b) => a.order - b.order,
);
