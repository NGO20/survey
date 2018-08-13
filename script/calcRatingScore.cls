VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "Sheet1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Function workFieldScore(workField) As Double
    Dim Count As Integer
    
    parts = Split(workField, ",")
    Count = UBound(parts) + 1
    If Count <= 3 Then
        c = 1
    ElseIf Count <= 5 Then
        c = 0.9
    ElseIf Count <= 7 Then
        c = 0.5
    Else
        c = 0
    End If
    workFieldScore = c * 2.91
End Function
Function registerYearScore(registerYear) As Double
    If InStr(registerYear, "0000-00-00") > 0 Then
        c = 0.2
    Else
        Gap = 2018 - year(registerYear)
        If Gap <= 5 Then
            c = 0.2
        Else
            c = 1
        End If
    End If
    registerYearScore = 2.34 * c
End Function
Function registerTypeScore(registerType) As Double
    Select Case registerType
        Case "���ע��"
            c = 1
        Case "����ע��"
            c = 0.8
        Case "�����ҿ�"
            c = 0.6
        Case "������֯"
            c = 0.4
    End Select
    registerTypeScore = 3.97 * c
End Function
Function staffFulltimeScore(staffFulltime) As Double
    Select Case staffFulltime
        Case "51�˼�����"
            c = 1
        Case "21-50��"
            c = 1
        Case "11-20��"
            c = 0.8
        Case "0-3��"
            c = 0.4
        Case "4-10��"
            c = 0.4
    End Select
    staffFulltimeScore = 1.96 * c
End Function
Function memberExperienceScore(memberExperience) As Double
    Select Case memberExperience
        Case "10��������"
            c = 1
        Case "5-10����"
            c = 0.8
        Case "3-5��"
            c = 0.5
        Case "3������"
            c = 0.3
    End Select
    memberExperienceScore = 10.32 * c
End Function
Function leadExperienceScore(leadExperience) As Double
    Select Case leadExperience
        Case "10��������"
            c = 1
        Case "5-10����"
            c = 0.8
        Case "3-5��"
            c = 0.5
        Case "3������"
            c = 0.3
    End Select
    leadExperienceScore = 6.72 * c
End Function
Function accountantStatusScore(accountantStatus) As Double
    Select Case accountantStatus
        Case "ȫְ"
            c = 1
        Case "��ְ"
            c = 0.5
        Case "û��"
            c = 0
    End Select
    accountantStatusScore = c * 3.71
End Function

Function infoPlatformScore(infoPlatform) As Double
    infoPlatformScore = 2.52
End Function
Function orgRulesScore(rules) As Double
    Dim Count As Integer
    
    parts = Split(rules, ",")
    Count = UBound(parts) + 1
    If rules = "���϶�û��" Then
        c = 0
    ElseIf Count > 3 Then
        c = 1
    ElseIf Count = 2 Then
        c = 0.8
    Else
        c = 0.5
    End If
    orgRulesScore = c * 3.16
End Function

Function hasBoardScore(hasBoard) As Double
    If hasBoard Then
        c = 1
    Else
        c = 0
    End If
    hasBoardScore = c * 4.09
End Function
Function hasPlanScore(hasPlan) As Double
    If hasPlan Then
        c = 1
    Else
        c = 0
    End If
    hasPlanScore = c * 5.3
End Function
Function hasReportScore(hasReport) As Double
    If hasReport Then
        c = 1
    Else
        c = 0
    End If
    hasReportScore = c * 4.09
End Function
Function projectSizeScore(projectSize) As Double
    Select Case projectSize
        Case "100������"
            c = 1
        Case "50��-100��"
            c = 0.8
        Case "20��-50��"
            c = 0.5
        Case "20������"
            c = 0
    End Select
    projectSizeScore = c * 17.92
End Function
Function participantSizeScore(participantSize) As Double
     Select Case participantSize
        Case "10000������"
            c = 1
        Case "5001-10000��"
            c = 0.8
        Case "2001-5000��"
            c = 0.6
        Case "501-2000��"
            c = 0.5
        Case "500������"
            c = 0.2
    End Select
    participantSizeScore = c * 4.7
End Function
Function serviceAreaScore(serviceArea) As Double
    Select Case serviceArea
        Case "ȫ����Χ����"
            c = 1
        Case "���Ǽ���ʡ��"
            c = 0.9
        Case "��֯���ڵ�ʡ��"
            c = 0.8
        Case "��֯���ڵĳ���"
            c = 0.7
        Case "��֯���ڵ�����"
            c = 0.6
    End Select
    serviceAreaScore = c * 4.7
End Function
Function mediaReportScore(mediaReport) As Double
    Select Case mediaReport
        Case "100������"
            c = 1
        Case "50-100��"
            c = 0.8
        Case "20-50��"
            c = 0.6
        Case "5-20��"
            c = 0.4
        Case "5������"
            c = 0.2
        Case 0
            c = 0
    End Select
    mediaReportScore = c * 5.29
End Function
Function fundInfoScore(fundInfo) As Double
    If fundInfo = "δ�������" Then
        c = 0
    ElseIf Count >= 3 Then
        c = 1
    ElseIf InStr(fundInfo, "��ҵ") > 0 Then
        c = 0.8
    Else
        c = 0.6
    End If
    fundInfoScore = c * 7.41
End Function
Function hasRewardScore(hasReward) As Double
    If hasReward Then
        c = 1
    Else
        c = 0
    End If
    hasRewardScore = c * 4.52
End Function
Function govLevelScore(govLevel) As Double
    Select Case govLevel
        Case "5A"
            c = 1
        Case "4A"
            c = 0.9
        Case "3A"
            c = 0.8
        Case "2A"
            c = 0.7
        Case "A"
            c = 0.6
        Case 0
            c = 0
    End Select
    govLevelScore = c * 4.38
End Function
Sub calcRatingScore(i)
    Dim workField, registerYear
    Dim score As Double
    score = 0
    workField = Sheet1.Cells(i, 17)
    score = score + workFieldScore(workField)
    
    registerYear = Sheet1.Cells(i, 19)
    score = score + registerYearScore(registerYear)
    
    registerType = Sheet1.Cells(i, 21)
    score = score + registerTypeScore(registerType)
    
    staffFulltime = Sheet1.Cells(i, 26)
    score = score + staffFulltimeScore(staffFulltime)
    
    memberExperience = Sheet1.Cells(i, 33)
    score = score + memberExperienceScore(memberExperience)
    
    leadExperience = Sheet1.Cells(i, 32)
    score = score + leadExperienceScore(leadExperience)
    
    accountantStatus = Sheet1.Cells(i, 31)
    score = score + accountantStatusScore(accountantStatus)
    
    'not found info platform
    score = score + infoPlatformScore(0)
    
    orgRules = Sheet1.Cells(i, 29)
    score = score + orgRulesScore(orgRules)
    
    hasBoard = Sheet1.Cells(i, 30)
    score = score + hasBoardScore(hasBoard)
    
    'not found plan & annual report
    score = score + hasPlanScore(1)
    score = score + hasReportScore(1)
    
    ' mistake
    projectSize = Sheet1.Cells(i, 24)
    score = score + projectSizeScore("100������")
    
    participantSize = Sheet1.Cells(i, 37)
    score = score + participantSizeScore(participantSize)
    
    serviceArea = Sheet1.Cells(i, 25)
    score = score + serviceAreaScore(serviceArea)
    
    mediaReport = Sheet1.Cells(i, 40)
    score = score + mediaReportScore(mediaReport)
    
    fundInfo = Sheet1.Cells(i, 39)
    score = score + fundInfoScore(fundInfo)
    
    hasReward = Sheet1.Cells(i, 35)
    score = score + hasRewardScore(hasReward)
    
    govLevel = Sheet1.Cells(i, 34)
    score = score + govLevelScore(govLevel)
    
    Sheet1.Cells(i, 113).Value = score
    
    If score >= 85 Then
        rating = "A+"
    ElseIf score >= 80 Then
        rating = "A"
    ElseIf score >= 75 Then
        rating = "A-"
    ElseIf score >= 65 Then
        rating = "B+"
    ElseIf score >= 60 Then
        rating = "B"
    Else
        rating = "B-"
    End If
    Sheet1.Cells(i, 114).Value = rating
End Sub

Sub calcAll()
    For i = 1 To 489
        calcRatingScore (i)
    Next
End Sub

