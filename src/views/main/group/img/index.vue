<template>
    <div class="group-tab-container">
        <!--顶部-->
<header id="header" class="wap-header">
	<a id="headerFiltrate" class="wap-header-back wap-header-l"  href="javascript:void(0)" title="筛选">筛选</a>
    <section class="wap-search">
        <form method="post">
            <div class="wap-search-text"><input type="text" placeholder="搜索商品、品牌、种类" /></div>
            <input type="submit" value="" />
        </form>
    </section>

</header>
<!--筛选-->
<section id="filtratePage" class="screening-conditions">
	<header class="wap-header">
		<a id="filtrateBackContains" class="wap-header-back wap-header-l" href="javascript:void(0)"></a>
		<h1>筛选</h1>
	</header>
	<article class="filtrate-cont">
		<div id="classify" class="filtrate-category">
			<a href="javascript:void(0)">
				分类<span>全部展开</span>
			</a>
		</div>
		<div class="filtrate-classify">
			<ul class="filtrate-classify-list">
				<li class="active">
					<a href="javascript:void(0)">图书</a>
					<ul>
						<li>
							<a href="javascript:void(0)">童书</a>
							<ul>
								<li>
									<a href="javascript:void(0)">3-6岁</a>
									<ul>
										<li>
											<a href="javascript:void(0)">卡通/动漫/图画书</a>
										</li>
										<li>
											<a href="javascript:void(0)">文学</a>
										</li>
										<li>
											<a href="javascript:void(0)">科普/百科</a>
										</li>
										<li>
											<a href="javascript:void(0)">益智游戏</a>
										</li>
									</ul>
								</li>
								<li>
									<a href="javascript:void(0)">7-10岁</a>
									<ul>
										<li>
											<a href="javascript:void(0)">文学</a>
										</li>
										<li>
											<a href="javascript:void(0)">科普/百科</a>
										</li>
										<li>
											<a href="javascript:void(0)">卡通/动漫/图画书</a>
										</li>
									</ul>
								</li>
								<li>
									<a href="javascript:void(0)">11-14岁</a>
									<ul>
										<li>
											<a href="javascript:void(0)">通话</a>
										</li>
										<li>
											<a href="javascript:void(0)">励志成长</a>
										</li>
										<li>
											<a href="javascript:void(0)">少儿英语</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li>
							<a href="javascript:void(0)">小说</a>
							<ul>
								<li>
									<a href="javascript:void(0)">外国小说</a>
								</li>
								<li>
									<a href="javascript:void(0)">中国当代小说</a>
								</li>
								<li>
									<a href="javascript:void(0)">中国古代小说</a>
								</li>
								<li>
									<a href="javascript:void(0)">中国现代小说</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="javascript:void(0)">考试</a>
							<ul>
								<li>
									<a href="javascript:void(0)">财税外贸保险类考试</a>
									<ul>
										<li><a href="javascript:void(0)">注册会计师考试</a></li>
										<li><a href="javascript:void(0)">中级会计职称考试</a></li>
										<li><a href="javascript:void(0)">证券从业资格考试</a></li>
									</ul>
								</li>
								<li>
									<a href="javascript:void(0)">外语考试</a>
									<ul>
										<li><a href="javascript:void(0)">英语四/六级</a></li>
										<li><a href="javascript:void(0)">IELTS考试用书</a></li>
										<li><a href="javascript:void(0)">TOEFL考试用书</a></li>
										<li><a href="javascript:void(0)">日语考试用户</a></li>
										<li><a href="javascript:void(0)">英语专业四/八级</a></li>
									</ul>
								</li>
								<li>
									<a href="javascript:void(0)">建筑工程类职称考试</a>
									<ul>
										<li><a href="javascript:void(0)">全国一级建造师考试</a></li>
										<li><a href="javascript:void(0)">全国二级建造师考试</a></li>
										<li><a href="javascript:void(0)">全国造价工程师考试</a></li>
										<li><a href="javascript:void(0)">勘察设计注册公用设备工程师</a></li>
									</ul>
								</li>
							</ul>
						</li>
						<li>
							<a href="javascript:void(0)">中小学教辅</a>
							<ul>
								<li>
									<a href="javascript:void(0)">中小学阅读</a>
									<ul>
										<li><a href="javascript:void(0)">课外阅读</a></li>
										<li><a href="javascript:void(0)">新课标</a></li>
										<li><a href="javascript:void(0)">文言文/古诗词</a></li>
									</ul>
								</li>
								<li>
									<a href="javascript:void(0)">教育理论/教师用书</a>
									<ul>
										<li><a href="javascript:void(0)">教育理论/教育主张</a></li>
										<li><a href="javascript:void(0)">幼儿园/学前教育</a></li>
										<li><a href="javascript:void(0)">学科教学</a></li>
										<li><a href="javascript:void(0)">教师成长/教师内功</a></li>
										<li><a href="javascript:void(0)">课堂教学/课堂管理</a></li>
										<li><a href="javascript:void(0)">班主任用书</a></li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="filtrate-price">
			价格
			<input id="minPrice" type="number" />
			~
			<input id="maxPrice" type="number" />
			元
		</div>
		<div id="address" class="filtrate-category">
			<a href="javascript:void(0)">
				收货地<span>全部展开</span>
			</a>
		</div>
		<div class="filtrate-address">
			<ul class="clearfix">
				<li><a href="javascript:void(0)">北京</a></li>
				<li><a href="javascript:void(0)">天津</a></li>
				<li><a href="javascript:void(0)">河北</a></li>
				<li><a href="javascript:void(0)">河南</a></li>
				<li><a href="javascript:void(0)">山西</a></li>
				<li><a href="javascript:void(0)">山东</a></li>
				<li><a href="javascript:void(0)">内蒙古</a></li>
				<li><a href="javascript:void(0)">辽宁</a></li>
				<li><a href="javascript:void(0)">吉林</a></li>
				<li><a href="javascript:void(0)">黑龙江</a></li>
				<li><a href="javascript:void(0)">上海</a></li>
				<li><a href="javascript:void(0)">江苏</a></li>
				<li><a href="javascript:void(0)">浙江</a></li>
				<li><a href="javascript:void(0)">安徽</a></li>
				<li><a href="javascript:void(0)">福建</a></li>
				<li><a href="javascript:void(0)">江西</a></li>
				<li><a href="javascript:void(0)">湖北</a></li>
				<li><a href="javascript:void(0)">湖南</a></li>
				<li><a href="javascript:void(0)">广东</a></li>
				<li><a href="javascript:void(0)">广西</a></li>
				<li><a href="javascript:void(0)">海南</a></li>
				<li><a href="javascript:void(0)">四川</a></li>
				<li><a href="javascript:void(0)">重庆</a></li>
				<li><a href="javascript:void(0)">贵州</a></li>
				<li><a href="javascript:void(0)">云南</a></li>
				<li><a href="javascript:void(0)">西藏</a></li>
				<li><a href="javascript:void(0)">陕西</a></li>
				<li><a href="javascript:void(0)">新疆</a></li>
				<li><a href="javascript:void(0)">青海</a></li>
				<li><a href="javascript:void(0)">宁夏</a></li>
				<li><a href="javascript:void(0)">甘肃</a></li>
				<li><a href="javascript:void(0)">台湾</a></li>
				<li><a href="javascript:void(0)">香港</a></li>
				<li><a href="javascript:void(0)">澳门</a></li>
			</ul>
		</div>
		<div class="filtrate-other">
			<h2>其他条件</h2>
			<ul class="clearfix">
				<li><label>促销</label></li>
				<li><label>尾品汇</label></li>
				<li><label>自营</label></li>
				<li class="active"><label>有货</label></li>
				<li><label>预售</label></li>
				<li><label>海外购</label></li>
			</ul>
		</div>
	</article>
	<footer class="filtrate-footer">
		<ul class="filtrate-btn clearfix">
			<li><input class="filtrate-reset" type="button" value="清空筛选条件"></li>
			<li><input class="filtrate-submit" type="button" value="确定"></li>
		</ul>
	</footer>
</section>
    </div>
</template>
<script ></script>
<style lang="less" src="./style.less"></style>
