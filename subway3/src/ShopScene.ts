class ShopScene extends Scene implements eui.UIComponent {
    public constructor() {
        super();
        Sound.currentscene = "ShopScene";
    }
    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    private cellGroup: eui.Group;

    protected childrenCreated(): void {
        super.childrenCreated();

        this.addBg(0xF08080, this);  //创建背景

        //创建标题行（标题图标、文字和退出图标）
        var titleImg: eui.Image = new eui.Image();
        var titleLbl: eui.Label = new eui.Label();
        var backImg: eui.Image = new eui.Image();
        this.addTitle(titleImg, "ic_shop_png", titleLbl, "商店", backImg, "ic_exit_png", this);

        //布局属性
        var margin = 50;
        var scale = 0.5;

        //个人信息group（等级、速度、载客量）
        var infoGroup: eui.Group = this.createPersonalInfo(margin, margin * 2 + titleImg.height * scale);
        Subway.infoGroup = infoGroup;
        // var level = egret.localStorage.getItem('Level');
        var levellabel = <eui.Label>infoGroup.getChildAt(1);
        levellabel.text = "等级:\nLV" + Subway.level;
        var energylabel = <eui.Label>infoGroup.getChildAt(4);
        energylabel.text = "能量:\n" + Subway.energynumber.text;
        this.addChild(infoGroup);

        //商店网格布局
        var rows = 3;//一行有三列
        this.cellGroup = this.createTileGroup(margin,
            margin * 3 + titleImg.height * scale + infoGroup.height,   //3个间隔 + 标题行高 + 信息栏高度
            this.getscreenWidth() - margin * 2,
            this.getscreenHeight() - margin * 4 - titleImg.height * scale - infoGroup.height,   //屏幕高度 - 3个间隔 - 标题行高 - 信息栏高
            rows, this);

        //商店图片数组测试
        let imgArray: Array<string> = ["levelup_png", "levelup_png", "levelup_png", "levelup_png", "levelup_png"];
        let labelimgArray: Array<string> = ["btn_png", "btn_png", "btn_png", "btn_png", "btn_png"];
        let labelArray: Array<string> = ["$30", "$30", "$30", "$30", "$30"];
        // for (let imgName of imgArrayTest) 
        for (var i = 0; i < imgArray.length; i++) {

            var group = new eui.Group();
            group.$setLayout(new eui.VerticalLayout());

            var img: eui.Image = new eui.Image();
            let imgName = imgArray[i];
            img.source = imgName;
            img.touchEnabled = true;
            group.addChild(img);

            var btngroup = new eui.Group();
            btngroup.width = 138;
            btngroup.height = 40;
            group.addChild(btngroup);

            var labelbackground = new egret.Bitmap();
            labelbackground.texture = RES.getRes(labelimgArray[i]);
            labelbackground.width = 128;
            labelbackground.height = 40;
            labelbackground.touchEnabled = true;
            btngroup.addChild(labelbackground);

            var label = this.CreatedLabel(0, 0, 128, 40, labelArray[i]);
            label.size = 30;
            label.textColor = 0xffffff;
            btngroup.addChild(label);
            // label.name = "" + i;
            img.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                let curShp = e.currentTarget;  //获取每个循环中的当下对象
                switch (curShp.source) {
                    case "levelup_png":
                        var levelstr = egret.localStorage.getItem('Level');
                        var level = Number(levelstr);
                        switch (level) {
                            case 1:
                                Subway.need = 10000;
                                Subway.task = Subway.task + "任务一:能量收集100000:unfinished;"
                                egret.localStorage.setItem('Task', Subway.task);
                                break;
                            case 2:
                                Subway.need = 20000;
                                Subway.task = Subway.task + "任务二:发车次数超过5次:unfinished;"
                                egret.localStorage.setItem('Task', Subway.task);
                                break;
                            case 3:
                                Subway.need = 30000;
                                Subway.task = Subway.task + ""
                                break;
                            case 4:
                                Subway.need = 40000;
                                Subway.task = Subway.task + ""
                                break;
                            case 5:
                                Subway.need = 40000;
                                Subway.task = Subway.task + ""
                                break;
                            case 6:
                                Subway.need = 40000;
                                Subway.task = Subway.task + ""
                                break;
                            case 7:
                                Subway.need = 40000;
                                Subway.task = Subway.task + ""
                                break;
                        }

                        if (Number(Subway.energynumber.text) >= Subway.need) {
                            SceneManager.getInstance().pushScene(new PopupScene("Levelup", "你的能量大于" + Subway.need + "，确认要升级吗？", 3,0));
                          
                        } else {
                            SceneManager.getInstance().pushScene(new PopupScene("Levelup", "你的能量小于" + Subway.need + "，暂时不能升级", 3,0));
                        }
                        break;
                }
            }, this);
            this.cellGroup.addChild(group);
        }
    }

    onComplete() { }

}