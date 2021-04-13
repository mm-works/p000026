DROP TABLE IF EXISTS material;
CREATE TABLE material (
	id text not null,
	name text not null,
	type smallint,
	cover text,
	color text,
	price smallint,
	specifications text,
	description text,
	no smallint,
	state smallint,
	tmup bigint,
	tmdown bigint,
	sort smallint
) WITH (oids = false);

COMMENT ON TABLE material IS '建材';
COMMENT ON COLUMN material.id IS 'ID';
COMMENT ON COLUMN material.name IS '名称';
COMMENT ON COLUMN material.type IS '类型:types.type';
COMMENT ON COLUMN material.cover IS '封面';
COMMENT ON COLUMN material.color IS '颜色';
COMMENT ON COLUMN material.price IS '价格';
COMMENT ON COLUMN material.specifications IS '规格';
COMMENT ON COLUMN material.description IS '描述';
COMMENT ON COLUMN material.no IS '存货数量';
COMMENT ON COLUMN material.state IS '状态：1 在售 2 已下架';
COMMENT ON COLUMN material.tmup IS '上架时间';
COMMENT ON COLUMN material.tmdown IS '下架时间';
COMMENT ON COLUMN material.sort IS '排序';

DROP TABLE IF EXISTS types;
CREATE TABLE types (
	id text not null,
	type smallint,
	name text,
	cover text,
	sort smallint
) WITH (oids = false);

COMMENT ON TABLE types IS '建材类型';
COMMENT ON COLUMN types.id IS 'ID';
COMMENT ON COLUMN types.type IS '类型标识';
COMMENT ON COLUMN types.name IS '类型说明';
COMMENT ON COLUMN types.cover IS '封面';
COMMENT ON COLUMN types.sort IS '排序';

insert into types(id,type,name,sort) values 
('001', 1, '智能家居', 10), 
('002', 2, '装饰建材', 9),
('003', 3, '结构建材', 8),
('004', 4, '环保建材', 7),
('005', 5, '卫浴建材', 6),
('006', 6, '厨具电器', 5),
('007', 7, '油漆涂料', 4),
('008', 8, '窗帘系列', 3),
('009', 9, '墙纸系列', 2),
('010', 10, '灯具系列', 1);

DROP TABLE IF EXISTS pictures;
CREATE TABLE pictures (
	id text not null,
	mid text not null,
	src text
) WITH (oids = false);

COMMENT ON TABLE pictures IS '图片';
COMMENT ON COLUMN pictures.id IS 'ID';
COMMENT ON COLUMN pictures.mid IS 'material.id';
COMMENT ON COLUMN pictures.src IS '文件地址';

DROP TABLE IF EXISTS swiper;
CREATE TABLE swiper (
	id text not null
) WITH (oids = false);

COMMENT ON TABLE swiper IS '首页轮播图片';
COMMENT ON COLUMN swiper.id IS '图片ID';

DROP TABLE IF EXISTS news;
CREATE TABLE news (
	id text not null,
	title text,
	time bigint,
	author text,
	content text
) WITH (oids = false);

COMMENT ON TABLE news IS '新闻资讯';
COMMENT ON COLUMN news.id IS 'ID';
COMMENT ON COLUMN news.title IS '新闻标题';
COMMENT ON COLUMN news.time IS '发布时间';
COMMENT ON COLUMN news.author IS '作者';
COMMENT ON COLUMN news.content IS '新闻内容';

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id text NOT NULL,
    name text,
    avatar text,
    phone text,
    sex smallint,
    CONSTRAINT users_id_unique UNIQUE (id),
    CONSTRAINT users_pkey PRIMARY KEY (id)
) WITH (oids = false);

CREATE INDEX users_id_index ON users USING btree (id);
COMMENT ON TABLE users IS '用户表';
COMMENT ON COLUMN users.id IS '用户ID';
COMMENT ON COLUMN users.name IS '用户姓名';
COMMENT ON COLUMN users.avatar IS '头像';
COMMENT ON COLUMN users.phone IS '手机号';
COMMENT ON COLUMN users.sex IS '性别';

DROP TABLE IF EXISTS auth;
CREATE TABLE auth (
    id text,
    userid text,
    type text,
    name text,
    token text,
    lastactive bigint,
    lastip text
) WITH (oids = false);

COMMENT ON TABLE auth IS '用户授权信息';
COMMENT ON COLUMN auth.id IS '用户授权信息id';
COMMENT ON COLUMN auth.userid IS '用户ID，users.id';
COMMENT ON COLUMN auth.type IS '登录类型（手机号 邮箱 用户名）或第三方应用名称（微信 微博等）';
COMMENT ON COLUMN auth.name IS '标识（手机号 邮箱 用户名或第三方应用的唯一标识）';
COMMENT ON COLUMN auth.token IS '密码凭证（站内的保存密码，站外的不保存或保存token）';
COMMENT ON COLUMN auth.lastactive IS '最后一次关键性操作时间';
COMMENT ON COLUMN auth.lastip IS '最后一次关键性操作ip地址';
