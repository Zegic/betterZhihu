// ==UserScript==
// @name         HappyZhihu
// @namespace    http://tampermonkey.net/
// @version      2025-07-16
// @description  try to take over the world!
// @author       You
// @match        https://www.zhihu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
     'use strict';

        // 要屏蔽的关键词
    const BLOCK_KEYWORDS = ['父亲','母亲','特产','拼多多','京东','购物','种草','相亲','旗舰','七夕','首款','产品','空调','牙刷','按摩','怎么选','智商税','女权','三角洲','女性','假期','旅行','音质','升级',
                            '清单','攻略','测评','对比','指南',
                            '中秋','春节','元宵','情人节','女神节','妇女节','五一','劳动节','母亲节','端午','七夕','中秋','国庆','双十一','双十二','圣诞节','元旦','立春','雨水','惊蛰','春分','清明','谷雨','立夏',
                            '小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至','小寒','大寒','年货','红包','促销','打折','优惠','秒杀','团购','限时','爆款',
                            '预售','满减','补贴','福利','钜惠','清仓','换季','新品','上市','囤货','好物','推荐','必买','选购','保养','护肤','美妆','穿搭','家居','家电','数码','旅游','酒店','机票','门票','保险',
                            '理财','贷款','信用卡','相亲','母婴','育儿','养生','减肥','健身','运动','食品','生鲜','零食','酒水','饮料','服饰','鞋包','珠宝','手表','建材','家具','厨具','宠物','鲜花','礼品','蛋糕',
                            '玩具','音像','影视','娱乐','音乐','演出','赛事','彩票','用酒','最优解','设计']; // '','','','','','','','','','','','','','','','','','','','',''
    // 目标问题的父容器选择器
    const QUESTION_CONTAINER_SELECTOR = '.ContentItem';
    // 标题元素选择器
    const TITLE_SELECTOR = '.ContentItem-title a';
    // 处理单个问题元素
    function processQuestionElement(element) {
        const titleElement = element.querySelector(TITLE_SELECTOR);
        if (titleElement) {
            const title = titleElement.textContent.trim();
            // 检查标题是否包含任意关键词
            if (BLOCK_KEYWORDS.some(keyword => title.includes(keyword))) {
                // 隐藏整个问题块，模拟广告屏蔽效果
                element.style.display = 'none';
                console.log(`已屏蔽问题: ${title}`);
            }
        }
    }
    // 处理所有可见的问题元素
    function processAllQuestions() {
        document.querySelectorAll(QUESTION_CONTAINER_SELECTOR).forEach(processQuestionElement);
    }
    // 页面加载完成后处理现有问题
    window.addEventListener('load', processAllQuestions);
    // 监听DOM变化，处理动态加载的内容
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // 确保是元素节点
                        if (node.matches(QUESTION_CONTAINER_SELECTOR)) {
                            processQuestionElement(node);
                        } else {
                            // 检查新增节点的子节点
                            node.querySelectorAll(QUESTION_CONTAINER_SELECTOR).forEach(processQuestionElement);
                        }
                    }
                });
            }
        });
    });
    // 开始观察DOM变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
