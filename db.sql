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
