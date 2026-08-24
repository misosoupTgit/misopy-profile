export type Lang = 'en' | 'ja';

export type TranslationKey =
	| 'nav.about'
	| 'nav.skills'
	| 'nav.projects'
	| 'contact.btn'
	| 'contact.xdm'
	| 'contact.discorddm'
	| 'contact.discorddm.hero'
	| 'contact.email'
	| 'hero.subtitle'
	| 'hero.desc'
	| 'hero.no_image1'
	| 'hero.no_image2'
	| 'hero.github'
	| 'hero.x'
	| 'hero.discord'
	| 'hero.countdown'
	| 'hero.downloads.label'
	| 'hero.downloads.via'
	| 'about.title'
	| 'about.p1'
	| 'about.p2'
	| 'built.title'
	| 'built.p1'
	| 'built.p2'
	| 'skills.title'
	| 'skills.languages'
	| 'skills.specializations'
	| 'skills.spec.compiler'
	| 'skills.spec.ide'
	| 'skills.spec.engine'
	| 'skills.spec.low_level'
	| 'projects.title'
	| 'projects.github_btn'
	| 'footer.privacy'
	| 'alert.discord.success'
	| 'alert.discord.fail'
	| 'alert.email.success'
	| 'alert.email.fail'
	| 'footer.visits';

export const translations: Record<Lang, Record<TranslationKey, string>> = {
	en: {
		'nav.about': 'About',
		'nav.skills': 'Skills',
		'nav.projects': 'Projects',
		'contact.btn': 'Contact',
		'contact.xdm': 'X (Twitter) DM',
		'contact.discorddm': 'Discord DM',
		'contact.discorddm.hero': 'Discord DM (@WKSHY_)',
		'contact.email': 'Email (misopy@outlook.com)',
		'hero.subtitle': 'Rust & Java Developer',
		'hero.desc':
			'Engine & Compiler Enthusiast. Building high-performance systems and exploring low-level optimizations.',
		'hero.no_image1': '[No Image]<br>images/icon1.png',
		'hero.no_image2': '[No Image]<br>images/icon2.png',
		'hero.github': 'GitHub',
		'hero.x': '@wkshy_',
		'hero.discord': 'Discord',
		'hero.countdown': 'Next Birthday:',
		'hero.downloads.label': 'Total mod downloads',
		'hero.downloads.via': 'CurseForge + Modrinth',
		'about.title': 'About',
		'about.p1':
			'I am a software developer with a strong focus on system programming and engine architecture. My primary expertise lies in Rust and Java, where I enjoy tackling complex problems related to compilers, language design, and performance optimization.',
		'about.p2':
			"My development philosophy centers around building robust, efficient, and maintainable software. Whether it's crafting a custom rendering engine or diving deep into low-level execution pipelines, I am passionate about understanding how things work under the hood.",
		'built.title': 'Built with',
		'built.p1':
			'This site is built with Svelte and TypeScript. Svelte was chosen over React for a more modern implementation model and a smoother day-to-day developer experience — less boilerplate, clearer reactivity, and a lighter runtime.',
		'built.p2':
			'Visual direction was shaped with Hallmark to avoid generic AI-looking UI patterns. The site is deployed on Cloudflare, with Modrinth / CurseForge download totals fetched through their official APIs.',
		'skills.title': 'Skills',
		'skills.languages': 'Languages',
		'skills.specializations': 'Specializations',
		'skills.spec.compiler': 'Compiler Design',
		'skills.spec.ide': 'IDE Development',
		'skills.spec.engine': 'Engine Architecture',
		'skills.spec.low_level': 'Low-level Optimization',
		'projects.title': 'Projects',
		'projects.github_btn': 'View on GitHub &rarr;',
		'footer.privacy': 'Privacy',
		'alert.discord.success': 'Copied Discord ID (WKSHY_) to clipboard!',
		'alert.discord.fail': 'Failed to copy. Please input manually.',
		'alert.email.success': 'Copied Email (misopy@outlook.com) to clipboard!',
		'alert.email.fail': 'Failed to copy.',
		'footer.visits': 'Visits'
	},
	ja: {
		'nav.about': 'About',
		'nav.skills': 'Skills',
		'nav.projects': 'Projects',
		'contact.btn': 'Contact',
		'contact.xdm': 'X (Twitter) DM',
		'contact.discorddm': 'Discord DM',
		'contact.discorddm.hero': 'Discord DM (@WKSHY_)',
		'contact.email': 'メール (misopy@outlook.com)',
		'hero.subtitle': 'Rust & Java 開発者',
		'hero.desc':
			'エンジンおよびコンパイラ開発を専門とするソフトウェア開発者です。低レイヤの最適化や高効率なシステム構築が大好き。いろいろやってます',
		'hero.no_image1': '[画像未配置]<br>images/icon1.png',
		'hero.no_image2': '[画像未配置]<br>images/icon2.png',
		'hero.github': 'GitHub',
		'hero.x': '@wkshy_',
		'hero.discord': 'Discord',
		'hero.countdown': '誕生日まで:',
		'hero.downloads.label': 'Mod 合計ダウンロード',
		'hero.downloads.via': 'CurseForge + Modrinth',
		'about.title': '概要',
		'about.p1':
			'システムプログラミングとエンジンアーキテクチャに特化したソフトウェア開発者です。主にRustとJavaを使用し、コンパイラや言語設計、パフォーマンス最適化などに取り組むことを得意としています',
		'about.p2':
			'「堅牢で効率的、かつ保守性の高いソフトウェアを構築する」ことを開発の理念としています。独自のレンダリングエンジンの作成から低レベルの実行パイプラインの深掘りまで、システムの裏側で何が起きているのかを理解することが好き。',
		'built.title': 'このサイトについて',
		'built.p1':
			'このページは Svelte と TypeScript で構築しています。React ではなく Svelte を選んだ理由は、よりモダンな実装ができ、開発体験の面でも扱いやすいからです。ボイラープレートが少なく、リアクティビティが明確で、ランタイムも軽量です。',
		'built.p2':
			'見た目は Hallmark で整え、いわゆる AI っぽい定番UIに寄せないようにしています。ホスティングは Cloudflare で、Modrinth / CurseForge の合計ダウンロード数は公式 API から取得しています。',
		'skills.title': 'スキル',
		'skills.languages': '言語',
		'skills.specializations': '専門分野',
		'skills.spec.compiler': 'コンパイラ設計',
		'skills.spec.ide': 'IDE開発',
		'skills.spec.engine': 'エンジン設計',
		'skills.spec.low_level': '低レイヤ最適化',
		'projects.title': 'プロジェクト',
		'projects.github_btn': 'GitHubで見る &rarr;',
		'footer.privacy': 'プライバシー',
		'alert.discord.success': 'Discord ID (WKSHY_) をクリップボードにコピーしました！',
		'alert.discord.fail': 'コピーに失敗しました。手動で「WKSHY_」を入力してください。',
		'alert.email.success': 'メールアドレス (misopy@outlook.com) をクリップボードにコピーしました！',
		'alert.email.fail': 'コピーに失敗しました。',
		'footer.visits': '訪問者数'
	}
};
